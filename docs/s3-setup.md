# Configuración de S3 Bucket para Zebra CMS

## 1. Crear el Bucket S3

### Opción A: Usando AWS Console

1. **Accede a AWS Console** → S3
2. **Crea un nuevo bucket:**
   - Nombre del bucket: `zebra-cms-uploads` (o el nombre que prefieras, debe ser único globalmente)
   - Región: Selecciona la misma región que usarás (ej: `us-east-1`, `us-west-2`, etc.)
   - **IMPORTANTE:** Anota el nombre del bucket y la región

3. **Configuración del bucket:**
   - **Block Public Access:** 
     - Si quieres acceso público directo: Desactiva "Block all public access" (NO recomendado para producción)
     - Si usas CloudFront o URLs presignadas: Mantén bloqueado (RECOMENDADO)
   - **Versioning:** Opcional, puedes activarlo para backups
   - **Encryption:** Activa "Server-side encryption" con AES-256 (recomendado)

### Opción B: Usando AWS CLI

```bash
aws s3api create-bucket \
  --bucket zebra-cms-uploads \
  --region us-east-1 \
  --create-bucket-configuration LocationConstraint=us-east-1
```

## 2. Configurar CORS (Crucial para uploads desde el navegador)

1. En el bucket, ve a **Permissions** → **Cross-origin resource sharing (CORS)**
2. Agrega esta configuración:

```json
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "HEAD"
    ],
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://tu-dominio.com"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3000
  }
]
```

**Nota:** Reemplaza `http://localhost:3000` y `https://tu-dominio.com` con tus URLs reales.

## 3. Configurar Bucket Policy (Para acceso público de lectura)

Si quieres que las imágenes sean accesibles públicamente (sin autenticación):

1. Ve a **Permissions** → **Bucket policy**
2. Agrega esta política (reemplaza `zebra-cms-uploads` con tu nombre de bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::zebra-cms-uploads/*"
    }
  ]
}
```

**⚠️ IMPORTANTE:** Esta política hace que todos los archivos sean públicos. Si prefieres más seguridad, usa CloudFront o URLs presignadas para lectura.

## 4. Crear Usuario IAM para Convex

Necesitas crear un usuario IAM con permisos para subir archivos:

### Opción A: Usando AWS Console

1. Ve a **IAM** → **Users** → **Create user**
2. Nombre: `zebra-cms-s3-user`
3. **NO** marques "Provide user access to the AWS Management Console"
4. En **Set permissions**, selecciona **Attach policies directly**
5. Crea una política personalizada con este JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::zebra-cms-uploads/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::zebra-cms-uploads"
    }
  ]
}
```

6. Asigna esta política al usuario
7. **Crea Access Keys:**
   - Ve a la pestaña **Security credentials**
   - Click en **Create access key**
   - Selecciona **Application running outside AWS**
   - **GUARDA** el Access Key ID y Secret Access Key (solo se muestran una vez)

### Opción B: Usando AWS CLI

```bash
# Crear usuario
aws iam create-user --user-name zebra-cms-s3-user

# Crear política
aws iam create-policy \
  --policy-name ZebraCMS-S3-Policy \
  --policy-document file://s3-policy.json

# Adjuntar política al usuario
aws iam attach-user-policy \
  --user-name zebra-cms-s3-user \
  --policy-arn arn:aws:iam::TU-ACCOUNT-ID:policy/ZebraCMS-S3-Policy

# Crear access key
aws iam create-access-key --user-name zebra-cms-s3-user
```

## 5. Configurar Variables de Entorno

### En Convex Dashboard:

1. Ve a tu proyecto en [Convex Dashboard](https://dashboard.convex.dev)
2. Ve a **Settings** → **Environment Variables**
3. Agrega estas variables:

```
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_SECRET_ACCESS_KEY=tu-secret-access-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=zebra-cms-uploads
```

### En `.env.local` (opcional, solo si necesitas las URLs públicas en el cliente):

```env
NEXT_PUBLIC_S3_BUCKET_NAME=zebra-cms-uploads
NEXT_PUBLIC_AWS_REGION=us-east-1
```

**Nota:** El código ya construye las URLs usando estos valores desde Convex, así que estas variables públicas son opcionales.

## 6. Estructura de Carpetas en S3

El bucket creará automáticamente esta estructura:
```
zebra-cms-uploads/
  └── uploads/
      ├── 1234567890-imagen1.jpg
      ├── 1234567891-imagen2.png
      └── ...
```

## 7. Verificación

Para verificar que todo funciona:

1. **Verifica el bucket:**
   ```bash
   aws s3 ls s3://zebra-cms-uploads/
   ```

2. **Prueba un upload desde la app:**
   - Inicia sesión en `/admin`
   - Ve a cualquier sección (Team, Services, etc.)
   - Intenta subir una imagen
   - Verifica que aparezca en el bucket S3

3. **Verifica acceso público:**
   - Copia una URL de imagen desde la app
   - Ábrela en una ventana de incógnito
   - Debe cargar la imagen

## 8. Opciones de Seguridad Avanzadas

### Opción A: CloudFront (Recomendado para producción)

1. Crea una distribución CloudFront
2. Origen: Tu bucket S3
3. Configura signed URLs o signed cookies para acceso controlado
4. Actualiza `convex/files.ts` para usar la URL de CloudFront en lugar de S3 directo

### Opción B: URLs Presignadas para Lectura

Modifica `convex/files.ts` para generar URLs presignadas también para lectura (no solo escritura).

### Opción C: Bucket Privado con CloudFront OAI

1. Mantén el bucket completamente privado
2. Configura CloudFront con Origin Access Identity (OAI)
3. Solo CloudFront puede acceder al bucket
4. Las URLs públicas son a través de CloudFront

## 9. Troubleshooting

### Error: "Access Denied"
- Verifica que las credenciales IAM tengan los permisos correctos
- Verifica que el bucket policy permita las operaciones necesarias

### Error: "CORS policy"
- Verifica la configuración CORS del bucket
- Asegúrate de incluir tu dominio en `AllowedOrigins`

### Las imágenes no se muestran
- Verifica que el bucket policy permita `s3:GetObject`
- Verifica que la URL construida sea correcta
- Prueba accediendo directamente a la URL en el navegador

### Error: "Bucket name already exists"
- Los nombres de bucket S3 deben ser únicos globalmente
- Elige otro nombre

## 10. Costos Estimados

- **Storage:** ~$0.023 por GB/mes
- **PUT requests:** ~$0.005 por 1,000 requests
- **GET requests:** ~$0.0004 por 1,000 requests
- **Data transfer out:** Primeros 100 GB/mes gratis, luego ~$0.09 por GB

Para una aplicación pequeña/mediana, los costos suelen ser < $5/mes.

## Checklist Final

- [ ] Bucket S3 creado con nombre único
- [ ] CORS configurado correctamente
- [ ] Bucket policy configurada (si necesitas acceso público)
- [ ] Usuario IAM creado con permisos adecuados
- [ ] Access Keys generadas y guardadas
- [ ] Variables de entorno configuradas en Convex Dashboard
- [ ] Prueba de upload exitosa
- [ ] Prueba de acceso a imágenes exitosa

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
} from "../env";
import { S3Response } from "@/interface";

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const validateImage = (file: File): ValidationResult => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Tipo de archivo no permitido. Solo: ${ALLOWED_TYPES.join(", ")}`,
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      isValid: false,
      error: `Archivo muy grande. Máximo: ${MAX_SIZE / 1024 / 1024}MB`,
    };
  }

  return { isValid: true };
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const saveImageToS3 = async (
  file: File,
  key: string
): Promise<S3Response> => {
  try {
    const validation = validateImage(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const base64Data = await fileToBase64(file);
    const base64Content = base64Data.split(",")[1];
    const buffer = Buffer.from(base64Content, "base64");

    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      })
    );

    return data as S3Response;
  } catch (error) {
    throw new Error(`Error al guardar imagen: ${error}`);
  }
};

export const getImageFromS3 = async (key: string): Promise<S3Response> => {
  try {
    const data = await s3Client.send(
      new GetObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
      })
    );

    return data as S3Response;
  } catch (error) {
    throw new Error(`Error al obtener imagen: ${error}`);
  }
};

export const deleteImageFromS3 = async (key: string): Promise<S3Response> => {
  try {
    const data = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
      })
    );

    return data as S3Response;
  } catch (error) {
    throw new Error(`Error al eliminar imagen: ${error}`);
  }
};

// export const getImageUrl = (key: string): string =>
//   `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;

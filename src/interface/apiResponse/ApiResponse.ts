import { DeleteObjectCommandOutput, GetObjectCommandOutput, PutObjectCommandOutput } from "@aws-sdk/client-s3";

export type S3Response = GetObjectCommandOutput | PutObjectCommandOutput | DeleteObjectCommandOutput;

export interface ApiResponse<T> {
  code: number | string;
  message: string;
  data: T;
}

export interface SelectOption {
  value: string;
  label: string;
}


export interface S3UploadResponse {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

export interface S3GetResponse {
  success: boolean;
  data?: GetObjectCommandOutput;
  error?: string;
}

export interface S3DeleteResponse {
  success: boolean;
  data?: DeleteObjectCommandOutput;
  error?: string;
}
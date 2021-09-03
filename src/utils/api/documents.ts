import { enhancedFetcher } from "@/utils/api/fetcher";
import { Document } from "@/types";

const URL = process.env.API_ROOT as string;
const USERNAME = process.env.USERNAME as string;

const defaultRequestInit = {
  headers: {
    "x-username": USERNAME,
    "Content-Type": "application/json",
  },
};

export const fetchDocuments = async (): Promise<Document[]> => {
  const { data } = await enhancedFetcher(URL, {
    ...defaultRequestInit,
    method: "GET",
  });
  return data;
};

export const fetchDocument = async (
  documentId: string | number
): Promise<Document> => {
  const { data } = await enhancedFetcher(`${URL}/${documentId}`, {
    ...defaultRequestInit,
    method: "GET",
  });
  return data;
};

export const addDocument = async (
  documentId?: string | number
): Promise<Document> => {
  const { data } = await enhancedFetcher(URL, {
    ...defaultRequestInit,
    method: "POST",
    body: JSON.stringify({
      title: "",
      parent: documentId ? documentId : null,
    }),
  });

  return data;
};

export const removeDocument = async (
  documentId: string | number
): Promise<Document> => {
  const { data } = await enhancedFetcher(`${URL}/${documentId}`, {
    ...defaultRequestInit,
    method: "DELETE",
  });

  return data;
};

export const editDocument = async (
  documentId: string | number,
  title: string,
  content: string
): Promise<Document> => {
  const { data } = await enhancedFetcher(`${URL}/${documentId}`, {
    ...defaultRequestInit,
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return data;
};

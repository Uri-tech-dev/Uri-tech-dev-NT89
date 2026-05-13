"use client";

import { useQuery } from "@apollo/client/react";
import {
  POSC_PRODUCTS as PRODUCTS,
  POSC_PRODUCT_DETAIL as PRODUCT_DETAIL,
  POSC_PRODUCT_CATEGORIES as PRODUCT_CATEGORIES,
} from "@/graphql/ecommerce/queries/product";
import { CP_PAGES } from "@/graphql/cms/queries/page";
import { CP_POST, CP_POSTS } from "@/graphql/cms/queries/post";

export function useProducts(variables?: {
  categoryId?: string;
  page?: number;
  perPage?: number;
  searchValue?: string;
}) {
  const { data, loading, error, fetchMore } = useQuery(PRODUCTS, {
    variables: { page: 1, perPage: 20, ...variables },
    fetchPolicy: "cache-and-network",
  });

  return {
    products: (data as any)?.poscProducts || [],
    loading,
    error,
    fetchMore,
  };
}

export function useProductDetail(productId: string) {
  const { data, loading, error } = useQuery(PRODUCT_DETAIL, {
    variables: { _id: productId },
    skip: !productId,
    fetchPolicy: "cache-and-network",
  });

  return {
    product: (data as any)?.poscProductDetail || null,
    loading,
    error,
  };
}

export function useProductCategories(parentId?: string) {
  const { data, loading, error } = useQuery(PRODUCT_CATEGORIES, {
    variables: { parentId },
    fetchPolicy: "cache-and-network",
  });

  return {
    categories: (data as any)?.poscProductCategories || [],
    loading,
    error,
  };
}

export function useCmsPageDetail(slug: string) {
  const { data, loading, error } = useQuery(CP_PAGES, {
    variables: {},
    skip: !slug,
    fetchPolicy: "cache-and-network",
  });

  const pages: any[] = (data as any)?.cpPages || [];
  return {
    page: pages.find((p) => p.slug === slug) || null,
    loading,
    error,
  };
}

export function useCmsPosts(variables?: {
  categoryIds?: string[];
  tagIds?: string[];
  searchValue?: string;
  cursor?: string;
  limit?: number;
}) {
  const { data, loading, error } = useQuery(CP_POSTS, {
    variables: { status: "published", ...variables },
    fetchPolicy: "cache-and-network",
  });

  return {
    posts: (data as any)?.cpPosts || [],
    loading,
    error,
  };
}

export function useCmsPostDetail(slug: string) {
  const { data, loading, error } = useQuery(CP_POST, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: "cache-and-network",
  });

  return {
    post: (data as any)?.cpPost || null,
    loading,
    error,
  };
}

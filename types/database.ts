/**
 * Supabase Database Type Definitions
 * Auto-compatible with PostgreSQL schema generated in Phase 09.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type GemstoneStatus = "draft" | "available" | "sold" | "hidden";
export type InquiryStatus = "new" | "in_progress" | "resolved" | "archived";
export type AdminRoleType = "admin" | "super_admin";

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          seo_title: string | null;
          seo_description: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      gemstones: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          sku: string | null;
          short_description: string | null;
          description: string | null;
          price: number | null;
          currency: string | null;
          carat_weight: number | null;
          dimensions: string | null;
          color: string | null;
          clarity: string | null;
          cut: string | null;
          origin: string | null;
          treatment: string | null;
          certificate_lab: string | null;
          certificate_number: string | null;
          certificate_url: string | null;
          status: GemstoneStatus;
          featured: boolean;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          slug: string;
          sku?: string | null;
          short_description?: string | null;
          description?: string | null;
          price?: number | null;
          currency?: string | null;
          carat_weight?: number | null;
          dimensions?: string | null;
          color?: string | null;
          clarity?: string | null;
          cut?: string | null;
          origin?: string | null;
          treatment?: string | null;
          certificate_lab?: string | null;
          certificate_number?: string | null;
          certificate_url?: string | null;
          status?: GemstoneStatus;
          featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          slug?: string;
          sku?: string | null;
          short_description?: string | null;
          description?: string | null;
          price?: number | null;
          currency?: string | null;
          carat_weight?: number | null;
          dimensions?: string | null;
          color?: string | null;
          clarity?: string | null;
          cut?: string | null;
          origin?: string | null;
          treatment?: string | null;
          certificate_lab?: string | null;
          certificate_number?: string | null;
          certificate_url?: string | null;
          status?: GemstoneStatus;
          featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gemstones_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };

      gemstone_images: {
        Row: {
          id: string;
          gemstone_id: string;
          storage_path: string | null;
          image_url: string;
          alt_text: string | null;
          caption: string | null;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          gemstone_id: string;
          storage_path?: string | null;
          image_url: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          gemstone_id?: string;
          storage_path?: string | null;
          image_url?: string;
          alt_text?: string | null;
          caption?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gemstone_images_gemstone_id_fkey";
            columns: ["gemstone_id"];
            isOneToOne: false;
            referencedRelation: "gemstones";
            referencedColumns: ["id"];
          }
        ];
      };

      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          inquiry_type: string;
          gemstone_id: string | null;
          gemstone_slug: string | null;
          gemstone_name: string | null;
          message: string;
          status: InquiryStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          inquiry_type: string;
          gemstone_id?: string | null;
          gemstone_slug?: string | null;
          gemstone_name?: string | null;
          message: string;
          status?: InquiryStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          inquiry_type?: string;
          gemstone_id?: string | null;
          gemstone_slug?: string | null;
          gemstone_name?: string | null;
          message?: string;
          status?: InquiryStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inquiries_gemstone_id_fkey";
            columns: ["gemstone_id"];
            isOneToOne: false;
            referencedRelation: "gemstones";
            referencedColumns: ["id"];
          }
        ];
      };

      profiles: {
        Row: {
          id: string;
          email: string | null;
          role: AdminRoleType;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          role?: AdminRoleType;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          role?: AdminRoleType;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      admin_roles: {
        Row: {
          id: string;
          user_id: string;
          role: AdminRoleType;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: AdminRoleType;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: AdminRoleType;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      gemstone_status: GemstoneStatus;
      inquiry_status: InquiryStatus;
      admin_role_type: AdminRoleType;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type GemstoneRow = Database["public"]["Tables"]["gemstones"]["Row"];
export type GemstoneImageRow = Database["public"]["Tables"]["gemstone_images"]["Row"];
export type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];
export type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type AdminRoleRow = Database["public"]["Tables"]["admin_roles"]["Row"];

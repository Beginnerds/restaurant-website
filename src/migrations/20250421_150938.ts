import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_menu_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menu_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menu_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menu_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('facebook', 'Instagram', 'x', 'youtube');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_social_links_platform" AS ENUM('facebook', 'Instagram', 'x', 'youtube');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menu_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menu_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "menu_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"order" numeric,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_menu_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_menu_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_order" numeric,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menu_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"price" numeric,
  	"category_id" integer,
  	"image_id" integer,
  	"available" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_menu_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_menu_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_price" numeric,
  	"version_category_id" integer,
  	"version_image_id" integer,
  	"version_available" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menu_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"menu_categories_id" integer,
  	"menu_items_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_featured_section_featured_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"featured_menu_item_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_featured_section_featured_category_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"featured_category_item_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_services_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_hero_image_id" integer,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_cta_text" varchar,
  	"hero_cta_link" varchar,
  	"testimonials_image_id" integer,
  	"testimonials_heading" varchar,
  	"testimonials_description" varchar,
  	"services_section_heading" varchar,
  	"services_section_description" varchar,
  	"services_section_cta_text" varchar,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v_version_featured_section_featured_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_menu_item_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v_version_featured_section_featured_category_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_category_item_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v_version_services_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_hero_image_id" integer,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_cta_text" varchar,
  	"version_hero_cta_link" varchar,
  	"version_testimonials_image_id" integer,
  	"version_testimonials_heading" varchar,
  	"version_testimonials_description" varchar,
  	"version_services_section_heading" varchar,
  	"version_services_section_description" varchar,
  	"version_services_section_cta_text" varchar,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_site_settings_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_address" varchar,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"who_we_are_image_id" integer,
  	"who_we_are_heading" varchar,
  	"who_we_are_description" varchar,
  	"services_image_id" integer,
  	"services_heading" varchar,
  	"services_description" varchar,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_who_we_are_image_id" integer,
  	"version_who_we_are_heading" varchar,
  	"version_who_we_are_description" varchar,
  	"version_services_image_id" integer,
  	"version_services_heading" varchar,
  	"version_services_description" varchar,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "menu_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"heading" varchar,
  	"description" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"_status" "enum_menu_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_menu_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_heading" varchar,
  	"version_description" varchar,
  	"version_cta_text" varchar,
  	"version_cta_link" varchar,
  	"version__status" "enum__menu_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  DO $$ BEGIN
   ALTER TABLE "menu_categories" ADD CONSTRAINT "menu_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_menu_categories_v" ADD CONSTRAINT "_menu_categories_v_parent_id_menu_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_menu_categories_v" ADD CONSTRAINT "_menu_categories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_menu_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_parent_id_menu_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_version_category_id_menu_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_categories_fk" FOREIGN KEY ("menu_categories_id") REFERENCES "public"."menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_featured_section_featured_menu_items" ADD CONSTRAINT "home_page_featured_section_featured_menu_items_featured_menu_item_id_menu_items_id_fk" FOREIGN KEY ("featured_menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_featured_section_featured_menu_items" ADD CONSTRAINT "home_page_featured_section_featured_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_featured_section_featured_category_items" ADD CONSTRAINT "home_page_featured_section_featured_category_items_featured_category_item_id_menu_categories_id_fk" FOREIGN KEY ("featured_category_item_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_featured_section_featured_category_items" ADD CONSTRAINT "home_page_featured_section_featured_category_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_services_section_cards" ADD CONSTRAINT "home_page_services_section_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_services_section_cards" ADD CONSTRAINT "home_page_services_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page" ADD CONSTRAINT "home_page_testimonials_image_id_media_id_fk" FOREIGN KEY ("testimonials_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_featured_section_featured_menu_items" ADD CONSTRAINT "_home_page_v_version_featured_section_featured_menu_items_featured_menu_item_id_menu_items_id_fk" FOREIGN KEY ("featured_menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_featured_section_featured_menu_items" ADD CONSTRAINT "_home_page_v_version_featured_section_featured_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_featured_section_featured_category_items" ADD CONSTRAINT "_home_page_v_version_featured_section_featured_category_items_featured_category_item_id_menu_categories_id_fk" FOREIGN KEY ("featured_category_item_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_featured_section_featured_category_items" ADD CONSTRAINT "_home_page_v_version_featured_section_featured_category_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_services_section_cards" ADD CONSTRAINT "_home_page_v_version_services_section_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v_version_services_section_cards" ADD CONSTRAINT "_home_page_v_version_services_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_testimonials_image_id_media_id_fk" FOREIGN KEY ("version_testimonials_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_site_settings_v_version_social_links" ADD CONSTRAINT "_site_settings_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page" ADD CONSTRAINT "about_page_who_we_are_image_id_media_id_fk" FOREIGN KEY ("who_we_are_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_page" ADD CONSTRAINT "about_page_services_image_id_media_id_fk" FOREIGN KEY ("services_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_who_we_are_image_id_media_id_fk" FOREIGN KEY ("version_who_we_are_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_services_image_id_media_id_fk" FOREIGN KEY ("version_services_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "menu_page" ADD CONSTRAINT "menu_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_menu_page_v" ADD CONSTRAINT "_menu_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "menu_categories_image_idx" ON "menu_categories" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "menu_categories_updated_at_idx" ON "menu_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "menu_categories_created_at_idx" ON "menu_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "menu_categories__status_idx" ON "menu_categories" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_parent_idx" ON "_menu_categories_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_version_version_image_idx" ON "_menu_categories_v" USING btree ("version_image_id");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_version_version_updated_at_idx" ON "_menu_categories_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_version_version_created_at_idx" ON "_menu_categories_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_version_version__status_idx" ON "_menu_categories_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_created_at_idx" ON "_menu_categories_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_updated_at_idx" ON "_menu_categories_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_latest_idx" ON "_menu_categories_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_menu_categories_v_autosave_idx" ON "_menu_categories_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "menu_items_category_idx" ON "menu_items" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "menu_items_image_idx" ON "menu_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "menu_items__status_idx" ON "menu_items" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_parent_idx" ON "_menu_items_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_version_version_category_idx" ON "_menu_items_v" USING btree ("version_category_id");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_version_version_image_idx" ON "_menu_items_v" USING btree ("version_image_id");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_version_version_updated_at_idx" ON "_menu_items_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_version_version_created_at_idx" ON "_menu_items_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_version_version__status_idx" ON "_menu_items_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_created_at_idx" ON "_menu_items_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_updated_at_idx" ON "_menu_items_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_latest_idx" ON "_menu_items_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_menu_items_v_autosave_idx" ON "_menu_items_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_menu_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "home_page_featured_section_featured_menu_items_order_idx" ON "home_page_featured_section_featured_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_featured_section_featured_menu_items_parent_id_idx" ON "home_page_featured_section_featured_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_featured_section_featured_menu_items_featured_menu_item_idx" ON "home_page_featured_section_featured_menu_items" USING btree ("featured_menu_item_id");
  CREATE INDEX IF NOT EXISTS "home_page_featured_section_featured_category_items_order_idx" ON "home_page_featured_section_featured_category_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_featured_section_featured_category_items_parent_id_idx" ON "home_page_featured_section_featured_category_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_featured_section_featured_category_items_featured_category_item_idx" ON "home_page_featured_section_featured_category_items" USING btree ("featured_category_item_id");
  CREATE INDEX IF NOT EXISTS "home_page_services_section_cards_order_idx" ON "home_page_services_section_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_services_section_cards_parent_id_idx" ON "home_page_services_section_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_services_section_cards_image_idx" ON "home_page_services_section_cards" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "home_page_hero_hero_hero_image_idx" ON "home_page" USING btree ("hero_hero_image_id");
  CREATE INDEX IF NOT EXISTS "home_page_testimonials_testimonials_image_idx" ON "home_page" USING btree ("testimonials_image_id");
  CREATE INDEX IF NOT EXISTS "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_featured_section_featured_menu_items_order_idx" ON "_home_page_v_version_featured_section_featured_menu_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_featured_section_featured_menu_items_parent_id_idx" ON "_home_page_v_version_featured_section_featured_menu_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_featured_section_featured_menu_items_featured_menu_item_idx" ON "_home_page_v_version_featured_section_featured_menu_items" USING btree ("featured_menu_item_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_featured_section_featured_category_items_order_idx" ON "_home_page_v_version_featured_section_featured_category_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_featured_section_featured_category_items_parent_id_idx" ON "_home_page_v_version_featured_section_featured_category_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_featured_section_featured_category_items_featured_category_item_idx" ON "_home_page_v_version_featured_section_featured_category_items" USING btree ("featured_category_item_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_services_section_cards_order_idx" ON "_home_page_v_version_services_section_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_services_section_cards_parent_id_idx" ON "_home_page_v_version_services_section_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_services_section_cards_image_idx" ON "_home_page_v_version_services_section_cards" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_hero_version_hero_hero_image_idx" ON "_home_page_v" USING btree ("version_hero_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_testimonials_version_testimonials_image_idx" ON "_home_page_v" USING btree ("version_testimonials_image_id");
  CREATE INDEX IF NOT EXISTS "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_version_social_links_order_idx" ON "_site_settings_v_version_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_version_social_links_parent_id_idx" ON "_site_settings_v_version_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_version_version_logo_idx" ON "_site_settings_v" USING btree ("version_logo_id");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "about_page_who_we_are_image_idx" ON "about_page" USING btree ("who_we_are_image_id");
  CREATE INDEX IF NOT EXISTS "about_page_services_image_idx" ON "about_page" USING btree ("services_image_id");
  CREATE INDEX IF NOT EXISTS "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_version_who_we_are_image_idx" ON "_about_page_v" USING btree ("version_who_we_are_image_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_version_services_image_idx" ON "_about_page_v" USING btree ("version_services_image_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "menu_page_hero_image_idx" ON "menu_page" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "menu_page__status_idx" ON "menu_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_menu_page_v_version_version_hero_image_idx" ON "_menu_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_menu_page_v_version_version__status_idx" ON "_menu_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_menu_page_v_created_at_idx" ON "_menu_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_menu_page_v_updated_at_idx" ON "_menu_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_menu_page_v_latest_idx" ON "_menu_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_menu_page_v_autosave_idx" ON "_menu_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "menu_categories" CASCADE;
  DROP TABLE "_menu_categories_v" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "_menu_items_v" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_featured_section_featured_menu_items" CASCADE;
  DROP TABLE "home_page_featured_section_featured_category_items" CASCADE;
  DROP TABLE "home_page_services_section_cards" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "_home_page_v_version_featured_section_featured_menu_items" CASCADE;
  DROP TABLE "_home_page_v_version_featured_section_featured_category_items" CASCADE;
  DROP TABLE "_home_page_v_version_services_section_cards" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_social_links" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "menu_page" CASCADE;
  DROP TABLE "_menu_page_v" CASCADE;
  DROP TYPE "public"."enum_menu_categories_status";
  DROP TYPE "public"."enum__menu_categories_v_version_status";
  DROP TYPE "public"."enum_menu_items_status";
  DROP TYPE "public"."enum__menu_items_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_social_links_platform";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_menu_page_status";
  DROP TYPE "public"."enum__menu_page_v_version_status";`)
}

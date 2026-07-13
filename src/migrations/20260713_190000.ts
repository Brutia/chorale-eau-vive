import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_activites_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__activites_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_mariages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__mariages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_concerts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__concerts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_evenements_type" AS ENUM('presse', 'concert');
  CREATE TYPE "public"."enum_evenements_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__evenements_v_version_type" AS ENUM('presse', 'concert');
  CREATE TYPE "public"."enum__evenements_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_actualites_category" AS ENUM('Concert', 'Concours', 'Mariage', 'Autre');
  CREATE TYPE "public"."enum_actualites_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__actualites_v_version_category" AS ENUM('Concert', 'Concours', 'Mariage', 'Autre');
  CREATE TYPE "public"."enum__actualites_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_accueil_mini_cards_icon" AS ENUM('users', 'music', 'sparkles', 'heart');
  CREATE TYPE "public"."enum_presentation_team_members_image_position" AS ENUM('left', 'right');
  CREATE TABLE "activites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_activites_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_activites_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__activites_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "mariages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"date" varchar,
  	"location" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_mariages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_mariages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_date" varchar,
  	"version_location" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__mariages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "concerts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_concerts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_concerts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__concerts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "evenements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"type" "enum_evenements_type" DEFAULT 'presse',
  	"date" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"url" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_evenements_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_evenements_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_type" "enum__evenements_v_version_type" DEFAULT 'presse',
  	"version_date" varchar,
  	"version_description" varchar,
  	"version_image_id" integer,
  	"version_url" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__evenements_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "actualites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar,
  	"category" "enum_actualites_category" DEFAULT 'Concert',
  	"image_id" integer,
  	"link" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_actualites_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_actualites_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_date" varchar,
  	"version_description" varchar,
  	"version_category" "enum__actualites_v_version_category" DEFAULT 'Concert',
  	"version_image_id" integer,
  	"version_link" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__actualites_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"folder_id" integer,
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
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
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
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
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
  
  CREATE TABLE "payload_jobs" (
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
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"activites_id" integer,
  	"mariages_id" integer,
  	"concerts_id" integer,
  	"evenements_id" integer,
  	"actualites_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Groupe Vocal L''Eau Vive',
  	"brand_short_name" varchar DEFAULT 'L''Eau Vive',
  	"description" varchar,
  	"email" varchar,
  	"address" varchar,
  	"facebook_url" varchar,
  	"footer_wedding_title" varchar DEFAULT 'Mariage',
  	"footer_wedding_text" varchar,
  	"footer_wedding_button" varchar DEFAULT 'Découvrir le mariage',
  	"legal_mentions_url" varchar,
  	"privacy_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "accueil_welcome_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "accueil_mini_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"icon" "enum_accueil_mini_cards_icon" DEFAULT 'users',
  	"link" varchar
  );
  
  CREATE TABLE "accueil" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"hero_title_emphasis" varchar DEFAULT 'L''Eau Vive',
  	"hero_cta_label" varchar DEFAULT 'Nous découvrir',
  	"hero_cta_href" varchar DEFAULT '#actualites',
  	"welcome_eyebrow" varchar,
  	"welcome_title" varchar,
  	"welcome_image_id" integer,
  	"welcome_caption" varchar,
  	"welcome_link_label" varchar,
  	"welcome_link_href" varchar,
  	"news_section_title" varchar DEFAULT 'Actualités & Événements',
  	"news_section_subtitle" varchar DEFAULT 'La vie du chœur',
  	"wedding_cta_eyebrow" varchar,
  	"wedding_cta_title" varchar,
  	"wedding_cta_text" varchar,
  	"wedding_cta_button_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "presentation_history_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "presentation_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role_label" varchar,
  	"name" varchar NOT NULL,
  	"bio" jsonb,
  	"image_id" integer,
  	"image_position" "enum_presentation_team_members_image_position" DEFAULT 'left'
  );
  
  CREATE TABLE "presentation_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "presentation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"history_eyebrow" varchar,
  	"history_title" varchar,
  	"history_image_id" integer,
  	"history_caption" varchar,
  	"team_section_title" varchar,
  	"team_section_subtitle" varchar,
  	"gallery_section_title" varchar,
  	"gallery_section_subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"find_us" varchar,
  	"email_label" varchar DEFAULT 'Nous écrire',
  	"facebook_label" varchar DEFAULT 'Rester au courant',
  	"facebook_text" varchar DEFAULT 'Suivez-nous sur Facebook',
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"intro_title" varchar,
  	"wedding_promo_title" varchar,
  	"wedding_promo_text" varchar,
  	"wedding_promo_link_label" varchar,
  	"map_label" varchar,
  	"map_title" varchar,
  	"form_id" integer,
  	"success_title" varchar DEFAULT 'Merci pour votre message',
  	"success_message" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "concerts_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"section_title" varchar DEFAULT 'La Gazette Musicale de France',
  	"section_subtitle" varchar DEFAULT 'Archives & actualités',
  	"gazette_title" varchar DEFAULT 'La Gazette',
  	"gazette_title_italic" varchar DEFAULT 'Musicale de France',
  	"gazette_subtitle" varchar DEFAULT 'Le journal de nos concerts',
  	"gazette_instruction" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "activites_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mariage_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer,
  	"cta_text" varchar,
  	"cta_button_label" varchar DEFAULT 'Nous contacter',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "activites" ADD CONSTRAINT "activites_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activites_v" ADD CONSTRAINT "_activites_v_parent_id_activites_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activites_v" ADD CONSTRAINT "_activites_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mariages" ADD CONSTRAINT "mariages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mariages_v" ADD CONSTRAINT "_mariages_v_parent_id_mariages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."mariages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_mariages_v" ADD CONSTRAINT "_mariages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concerts" ADD CONSTRAINT "concerts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerts_v" ADD CONSTRAINT "_concerts_v_parent_id_concerts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."concerts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerts_v" ADD CONSTRAINT "_concerts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "evenements" ADD CONSTRAINT "evenements_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_evenements_v" ADD CONSTRAINT "_evenements_v_parent_id_evenements_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."evenements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_evenements_v" ADD CONSTRAINT "_evenements_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actualites" ADD CONSTRAINT "actualites_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actualites_v" ADD CONSTRAINT "_actualites_v_parent_id_actualites_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."actualites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actualites_v" ADD CONSTRAINT "_actualites_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activites_fk" FOREIGN KEY ("activites_id") REFERENCES "public"."activites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mariages_fk" FOREIGN KEY ("mariages_id") REFERENCES "public"."mariages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_concerts_fk" FOREIGN KEY ("concerts_id") REFERENCES "public"."concerts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_evenements_fk" FOREIGN KEY ("evenements_id") REFERENCES "public"."evenements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_welcome_paragraphs" ADD CONSTRAINT "accueil_welcome_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_mini_cards" ADD CONSTRAINT "accueil_mini_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_welcome_image_id_media_id_fk" FOREIGN KEY ("welcome_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presentation_history_paragraphs" ADD CONSTRAINT "presentation_history_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_team_members" ADD CONSTRAINT "presentation_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presentation_team_members" ADD CONSTRAINT "presentation_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_gallery" ADD CONSTRAINT "presentation_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presentation_gallery" ADD CONSTRAINT "presentation_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation" ADD CONSTRAINT "presentation_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presentation" ADD CONSTRAINT "presentation_history_image_id_media_id_fk" FOREIGN KEY ("history_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concerts_page" ADD CONSTRAINT "concerts_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activites_page" ADD CONSTRAINT "activites_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mariage_page" ADD CONSTRAINT "mariage_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "activites_slug_idx" ON "activites" USING btree ("slug");
  CREATE INDEX "activites_hero_image_idx" ON "activites" USING btree ("hero_image_id");
  CREATE INDEX "activites_updated_at_idx" ON "activites" USING btree ("updated_at");
  CREATE INDEX "activites_created_at_idx" ON "activites" USING btree ("created_at");
  CREATE INDEX "activites__status_idx" ON "activites" USING btree ("_status");
  CREATE INDEX "_activites_v_parent_idx" ON "_activites_v" USING btree ("parent_id");
  CREATE INDEX "_activites_v_version_version_slug_idx" ON "_activites_v" USING btree ("version_slug");
  CREATE INDEX "_activites_v_version_version_hero_image_idx" ON "_activites_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_activites_v_version_version_updated_at_idx" ON "_activites_v" USING btree ("version_updated_at");
  CREATE INDEX "_activites_v_version_version_created_at_idx" ON "_activites_v" USING btree ("version_created_at");
  CREATE INDEX "_activites_v_version_version__status_idx" ON "_activites_v" USING btree ("version__status");
  CREATE INDEX "_activites_v_created_at_idx" ON "_activites_v" USING btree ("created_at");
  CREATE INDEX "_activites_v_updated_at_idx" ON "_activites_v" USING btree ("updated_at");
  CREATE INDEX "_activites_v_latest_idx" ON "_activites_v" USING btree ("latest");
  CREATE INDEX "_activites_v_autosave_idx" ON "_activites_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "mariages_slug_idx" ON "mariages" USING btree ("slug");
  CREATE INDEX "mariages_hero_image_idx" ON "mariages" USING btree ("hero_image_id");
  CREATE INDEX "mariages_updated_at_idx" ON "mariages" USING btree ("updated_at");
  CREATE INDEX "mariages_created_at_idx" ON "mariages" USING btree ("created_at");
  CREATE INDEX "mariages__status_idx" ON "mariages" USING btree ("_status");
  CREATE INDEX "_mariages_v_parent_idx" ON "_mariages_v" USING btree ("parent_id");
  CREATE INDEX "_mariages_v_version_version_slug_idx" ON "_mariages_v" USING btree ("version_slug");
  CREATE INDEX "_mariages_v_version_version_hero_image_idx" ON "_mariages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_mariages_v_version_version_updated_at_idx" ON "_mariages_v" USING btree ("version_updated_at");
  CREATE INDEX "_mariages_v_version_version_created_at_idx" ON "_mariages_v" USING btree ("version_created_at");
  CREATE INDEX "_mariages_v_version_version__status_idx" ON "_mariages_v" USING btree ("version__status");
  CREATE INDEX "_mariages_v_created_at_idx" ON "_mariages_v" USING btree ("created_at");
  CREATE INDEX "_mariages_v_updated_at_idx" ON "_mariages_v" USING btree ("updated_at");
  CREATE INDEX "_mariages_v_latest_idx" ON "_mariages_v" USING btree ("latest");
  CREATE INDEX "_mariages_v_autosave_idx" ON "_mariages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "concerts_slug_idx" ON "concerts" USING btree ("slug");
  CREATE INDEX "concerts_hero_image_idx" ON "concerts" USING btree ("hero_image_id");
  CREATE INDEX "concerts_updated_at_idx" ON "concerts" USING btree ("updated_at");
  CREATE INDEX "concerts_created_at_idx" ON "concerts" USING btree ("created_at");
  CREATE INDEX "concerts__status_idx" ON "concerts" USING btree ("_status");
  CREATE INDEX "_concerts_v_parent_idx" ON "_concerts_v" USING btree ("parent_id");
  CREATE INDEX "_concerts_v_version_version_slug_idx" ON "_concerts_v" USING btree ("version_slug");
  CREATE INDEX "_concerts_v_version_version_hero_image_idx" ON "_concerts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_concerts_v_version_version_updated_at_idx" ON "_concerts_v" USING btree ("version_updated_at");
  CREATE INDEX "_concerts_v_version_version_created_at_idx" ON "_concerts_v" USING btree ("version_created_at");
  CREATE INDEX "_concerts_v_version_version__status_idx" ON "_concerts_v" USING btree ("version__status");
  CREATE INDEX "_concerts_v_created_at_idx" ON "_concerts_v" USING btree ("created_at");
  CREATE INDEX "_concerts_v_updated_at_idx" ON "_concerts_v" USING btree ("updated_at");
  CREATE INDEX "_concerts_v_latest_idx" ON "_concerts_v" USING btree ("latest");
  CREATE INDEX "_concerts_v_autosave_idx" ON "_concerts_v" USING btree ("autosave");
  CREATE INDEX "evenements_image_idx" ON "evenements" USING btree ("image_id");
  CREATE INDEX "evenements_updated_at_idx" ON "evenements" USING btree ("updated_at");
  CREATE INDEX "evenements_created_at_idx" ON "evenements" USING btree ("created_at");
  CREATE INDEX "evenements__status_idx" ON "evenements" USING btree ("_status");
  CREATE INDEX "_evenements_v_parent_idx" ON "_evenements_v" USING btree ("parent_id");
  CREATE INDEX "_evenements_v_version_version_image_idx" ON "_evenements_v" USING btree ("version_image_id");
  CREATE INDEX "_evenements_v_version_version_updated_at_idx" ON "_evenements_v" USING btree ("version_updated_at");
  CREATE INDEX "_evenements_v_version_version_created_at_idx" ON "_evenements_v" USING btree ("version_created_at");
  CREATE INDEX "_evenements_v_version_version__status_idx" ON "_evenements_v" USING btree ("version__status");
  CREATE INDEX "_evenements_v_created_at_idx" ON "_evenements_v" USING btree ("created_at");
  CREATE INDEX "_evenements_v_updated_at_idx" ON "_evenements_v" USING btree ("updated_at");
  CREATE INDEX "_evenements_v_latest_idx" ON "_evenements_v" USING btree ("latest");
  CREATE INDEX "_evenements_v_autosave_idx" ON "_evenements_v" USING btree ("autosave");
  CREATE INDEX "actualites_image_idx" ON "actualites" USING btree ("image_id");
  CREATE INDEX "actualites_updated_at_idx" ON "actualites" USING btree ("updated_at");
  CREATE INDEX "actualites_created_at_idx" ON "actualites" USING btree ("created_at");
  CREATE INDEX "actualites__status_idx" ON "actualites" USING btree ("_status");
  CREATE INDEX "_actualites_v_parent_idx" ON "_actualites_v" USING btree ("parent_id");
  CREATE INDEX "_actualites_v_version_version_image_idx" ON "_actualites_v" USING btree ("version_image_id");
  CREATE INDEX "_actualites_v_version_version_updated_at_idx" ON "_actualites_v" USING btree ("version_updated_at");
  CREATE INDEX "_actualites_v_version_version_created_at_idx" ON "_actualites_v" USING btree ("version_created_at");
  CREATE INDEX "_actualites_v_version_version__status_idx" ON "_actualites_v" USING btree ("version__status");
  CREATE INDEX "_actualites_v_created_at_idx" ON "_actualites_v" USING btree ("created_at");
  CREATE INDEX "_actualites_v_updated_at_idx" ON "_actualites_v" USING btree ("updated_at");
  CREATE INDEX "_actualites_v_latest_idx" ON "_actualites_v" USING btree ("latest");
  CREATE INDEX "_actualites_v_autosave_idx" ON "_actualites_v" USING btree ("autosave");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_activites_id_idx" ON "payload_locked_documents_rels" USING btree ("activites_id");
  CREATE INDEX "payload_locked_documents_rels_mariages_id_idx" ON "payload_locked_documents_rels" USING btree ("mariages_id");
  CREATE INDEX "payload_locked_documents_rels_concerts_id_idx" ON "payload_locked_documents_rels" USING btree ("concerts_id");
  CREATE INDEX "payload_locked_documents_rels_evenements_id_idx" ON "payload_locked_documents_rels" USING btree ("evenements_id");
  CREATE INDEX "payload_locked_documents_rels_actualites_id_idx" ON "payload_locked_documents_rels" USING btree ("actualites_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "accueil_welcome_paragraphs_order_idx" ON "accueil_welcome_paragraphs" USING btree ("_order");
  CREATE INDEX "accueil_welcome_paragraphs_parent_id_idx" ON "accueil_welcome_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "accueil_mini_cards_order_idx" ON "accueil_mini_cards" USING btree ("_order");
  CREATE INDEX "accueil_mini_cards_parent_id_idx" ON "accueil_mini_cards" USING btree ("_parent_id");
  CREATE INDEX "accueil_hero_hero_image_idx" ON "accueil" USING btree ("hero_image_id");
  CREATE INDEX "accueil_welcome_welcome_image_idx" ON "accueil" USING btree ("welcome_image_id");
  CREATE INDEX "presentation_history_paragraphs_order_idx" ON "presentation_history_paragraphs" USING btree ("_order");
  CREATE INDEX "presentation_history_paragraphs_parent_id_idx" ON "presentation_history_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "presentation_team_members_order_idx" ON "presentation_team_members" USING btree ("_order");
  CREATE INDEX "presentation_team_members_parent_id_idx" ON "presentation_team_members" USING btree ("_parent_id");
  CREATE INDEX "presentation_team_members_image_idx" ON "presentation_team_members" USING btree ("image_id");
  CREATE INDEX "presentation_gallery_order_idx" ON "presentation_gallery" USING btree ("_order");
  CREATE INDEX "presentation_gallery_parent_id_idx" ON "presentation_gallery" USING btree ("_parent_id");
  CREATE INDEX "presentation_gallery_image_idx" ON "presentation_gallery" USING btree ("image_id");
  CREATE INDEX "presentation_hero_hero_image_idx" ON "presentation" USING btree ("hero_image_id");
  CREATE INDEX "presentation_history_history_image_idx" ON "presentation" USING btree ("history_image_id");
  CREATE INDEX "contact_hero_hero_image_idx" ON "contact" USING btree ("hero_image_id");
  CREATE INDEX "contact_form_idx" ON "contact" USING btree ("form_id");
  CREATE INDEX "concerts_page_hero_hero_image_idx" ON "concerts_page" USING btree ("hero_image_id");
  CREATE INDEX "activites_page_hero_hero_image_idx" ON "activites_page" USING btree ("hero_image_id");
  CREATE INDEX "mariage_page_hero_hero_image_idx" ON "mariage_page" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "activites" CASCADE;
  DROP TABLE "_activites_v" CASCADE;
  DROP TABLE "mariages" CASCADE;
  DROP TABLE "_mariages_v" CASCADE;
  DROP TABLE "concerts" CASCADE;
  DROP TABLE "_concerts_v" CASCADE;
  DROP TABLE "evenements" CASCADE;
  DROP TABLE "_evenements_v" CASCADE;
  DROP TABLE "actualites" CASCADE;
  DROP TABLE "_actualites_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "accueil_welcome_paragraphs" CASCADE;
  DROP TABLE "accueil_mini_cards" CASCADE;
  DROP TABLE "accueil" CASCADE;
  DROP TABLE "presentation_history_paragraphs" CASCADE;
  DROP TABLE "presentation_team_members" CASCADE;
  DROP TABLE "presentation_gallery" CASCADE;
  DROP TABLE "presentation" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "concerts_page" CASCADE;
  DROP TABLE "activites_page" CASCADE;
  DROP TABLE "mariage_page" CASCADE;
  DROP TYPE "public"."enum_activites_status";
  DROP TYPE "public"."enum__activites_v_version_status";
  DROP TYPE "public"."enum_mariages_status";
  DROP TYPE "public"."enum__mariages_v_version_status";
  DROP TYPE "public"."enum_concerts_status";
  DROP TYPE "public"."enum__concerts_v_version_status";
  DROP TYPE "public"."enum_evenements_type";
  DROP TYPE "public"."enum_evenements_status";
  DROP TYPE "public"."enum__evenements_v_version_type";
  DROP TYPE "public"."enum__evenements_v_version_status";
  DROP TYPE "public"."enum_actualites_category";
  DROP TYPE "public"."enum_actualites_status";
  DROP TYPE "public"."enum__actualites_v_version_category";
  DROP TYPE "public"."enum__actualites_v_version_status";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_accueil_mini_cards_icon";
  DROP TYPE "public"."enum_presentation_team_members_image_position";`)
}

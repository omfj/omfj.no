CREATE TABLE `uploaded_file` (
	`id` text PRIMARY KEY NOT NULL,
	`original_name` text NOT NULL,
	`content_type` text NOT NULL,
	`size` integer NOT NULL,
	`is_public` integer DEFAULT true NOT NULL,
	`uploaded_at` integer NOT NULL
);

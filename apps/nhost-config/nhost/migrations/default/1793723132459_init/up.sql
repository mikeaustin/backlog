SET transaction_timeout = 0;
SET check_function_bodies = false;

CREATE TABLE public.items (
    id uuid DEFAULT uuidv7() NOT NULL,
    title text DEFAULT ''::text NOT NULL
);

CREATE TABLE public.items2 (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    "teamKeySeqId" text NOT NULL,
    "statusId" text NOT NULL,
    "order" numeric DEFAULT 0 NOT NULL,
    flagged boolean DEFAULT false NOT NULL
);

CREATE TABLE public."itemsAssignees" (
    "itemId" uuid NOT NULL,
    "userId" uuid NOT NULL
);

ALTER TABLE ONLY public.items2
    ADD CONSTRAINT items2_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.items2
    ADD CONSTRAINT "items2_teamKeySeqId_key" UNIQUE ("teamKeySeqId");
ALTER TABLE ONLY public."itemsAssignees"
    ADD CONSTRAINT "itemsAssignees_pkey" PRIMARY KEY ("itemId", "userId");
ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."itemsAssignees"
    ADD CONSTRAINT "itemsAssignees_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items2(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."itemsAssignees"
    ADD CONSTRAINT "itemsAssignees_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

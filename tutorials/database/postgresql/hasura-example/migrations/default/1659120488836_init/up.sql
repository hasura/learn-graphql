SET check_function_bodies = false;
CREATE SCHEMA heroku_ext;
CREATE TABLE public.article (
    id integer NOT NULL,
    author_id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL
);
CREATE SEQUENCE public.article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.article_id_seq OWNED BY public.article.id;
CREATE TABLE public.article_tag (
    article_id integer NOT NULL,
    tag_id integer NOT NULL
);
CREATE TABLE public.author (
    id integer NOT NULL,
    name text NOT NULL,
    age integer NOT NULL
);
CREATE SEQUENCE public.author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.author_id_seq OWNED BY public.author.id;
CREATE VIEW public.old_users AS
 SELECT author.id,
    author.age
   FROM public.author
  WHERE (author.age >= 60);
CREATE TABLE public.tag (
    id integer NOT NULL,
    tag_value text
);
CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;
ALTER TABLE ONLY public.article ALTER COLUMN id SET DEFAULT nextval('public.article_id_seq'::regclass);
ALTER TABLE ONLY public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq'::regclass);
ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);
ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT article_tag_pkey PRIMARY KEY (article_id, tag_id);
ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT fk_article FOREIGN KEY (article_id) REFERENCES public.article(id);
ALTER TABLE ONLY public.article
    ADD CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES public.author(id);
ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES public.tag(id);

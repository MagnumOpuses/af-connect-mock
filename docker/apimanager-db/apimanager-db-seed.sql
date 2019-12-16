--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: apikeys; Type: TABLE; Schema: public; Owner: apimanager
--

CREATE TABLE public.apikeys (
    apikey character varying(200) NOT NULL,
    api_id integer NOT NULL,
    userinfo jsonb,
    email character varying(256) NOT NULL,
    ticket character varying(32),
    sent integer DEFAULT 0 NOT NULL,
    visited timestamp with time zone,
    application_id character varying(255),
    id integer NOT NULL
);


ALTER TABLE public.apikeys OWNER TO apimanager;

--
-- Name: apikeys_id_seq; Type: SEQUENCE; Schema: public; Owner: apimanager
--

CREATE SEQUENCE public.apikeys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.apikeys_id_seq OWNER TO apimanager;

--
-- Name: apikeys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apimanager
--

ALTER SEQUENCE public.apikeys_id_seq OWNED BY public.apikeys.id;


--
-- Name: available_apis; Type: TABLE; Schema: public; Owner: apimanager
--

CREATE TABLE public.available_apis (
    api_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description character varying(200)
);


ALTER TABLE public.available_apis OWNER TO apimanager;

--
-- Name: apikeys id; Type: DEFAULT; Schema: public; Owner: apimanager
--

ALTER TABLE ONLY public.apikeys ALTER COLUMN id SET DEFAULT nextval('public.apikeys_id_seq'::regclass);


--
-- Data for Name: apikeys; Type: TABLE DATA; Schema: public; Owner: apimanager
--

COPY public.apikeys (apikey, api_id, userinfo, email, ticket, sent, visited, application_id, id) FROM stdin;
dummydummydummydummydummydummydummydummydummydummy	1	{"name": "Dummy", "surname": "Dummy", "description": "Dummy api key", "company_name": "Dummy", "application_name": "Dummy"}	dummy.dummy@arbetsformedlingen.se	DUMMYDUMMYDUMMYDUMMYDUMMYDUMMYDU	1	2019-05-16 10:10:10.531158+00	Dummy	5
\.


--
-- Data for Name: available_apis; Type: TABLE DATA; Schema: public; Owner: apimanager
--

COPY public.available_apis (api_id, name, description) FROM stdin;
1	dummy	Dummy API.
\.


--
-- Name: apikeys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apimanager
--

SELECT pg_catalog.setval('public.apikeys_id_seq', 157, true);


--
-- Name: apikeys apikeys_pkey; Type: CONSTRAINT; Schema: public; Owner: apimanager
--

ALTER TABLE ONLY public.apikeys
    ADD CONSTRAINT apikeys_pkey PRIMARY KEY (id);


--
-- Name: available_apis available_apis_pkey; Type: CONSTRAINT; Schema: public; Owner: apimanager
--

ALTER TABLE ONLY public.available_apis
    ADD CONSTRAINT available_apis_pkey PRIMARY KEY (api_id);


--
-- Name: apikeys email_constraint; Type: CONSTRAINT; Schema: public; Owner: apimanager
--

ALTER TABLE ONLY public.apikeys
    ADD CONSTRAINT email_constraint UNIQUE (email);


--
-- Name: apikeys key_constraint; Type: CONSTRAINT; Schema: public; Owner: apimanager
--

ALTER TABLE ONLY public.apikeys
    ADD CONSTRAINT key_constraint UNIQUE (apikey);


--
-- Name: apikeys_api_id_idx; Type: INDEX; Schema: public; Owner: apimanager
--

CREATE INDEX apikeys_api_id_idx ON public.apikeys USING btree (api_id);


--
-- Name: apikeys_apikey_idx; Type: INDEX; Schema: public; Owner: apimanager
--

CREATE INDEX apikeys_apikey_idx ON public.apikeys USING btree (apikey);


--
-- Name: apikeys_email_idx; Type: INDEX; Schema: public; Owner: apimanager
--

CREATE INDEX apikeys_email_idx ON public.apikeys USING btree (email);


--
-- Name: apikeys_ticket_idx; Type: INDEX; Schema: public; Owner: apimanager
--

CREATE INDEX apikeys_ticket_idx ON public.apikeys USING btree (ticket);


--
-- PostgreSQL database dump complete
--


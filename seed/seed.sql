--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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

SET default_table_access_method = heap;

--
-- Name: booking; Type: TABLE; Schema: public; Owner: dunice
--

CREATE TABLE public.booking (
    id integer NOT NULL,
    user_id integer NOT NULL,
    car_id integer NOT NULL,
    rental_start timestamp without time zone NOT NULL,
    rental_end timestamp without time zone NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.booking OWNER TO dunice;

--
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: dunice
--

CREATE SEQUENCE public.booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booking_id_seq OWNER TO dunice;

--
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dunice
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.booking.id;


--
-- Name: rate_discounts; Type: TABLE; Schema: public; Owner: dunice
--

CREATE TABLE public.rate_discounts (
    id integer NOT NULL,
    percent integer NOT NULL,
    start_date integer NOT NULL,
    end_date integer NOT NULL,
    rate_id integer
);


ALTER TABLE public.rate_discounts OWNER TO dunice;

--
-- Name: rate_discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: dunice
--

CREATE SEQUENCE public.rate_discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rate_discounts_id_seq OWNER TO dunice;

--
-- Name: rate_discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dunice
--

ALTER SEQUENCE public.rate_discounts_id_seq OWNED BY public.rate_discounts.id;


--
-- Name: rates; Type: TABLE; Schema: public; Owner: dunice
--

CREATE TABLE public.rates (
    id integer NOT NULL,
    name character varying DEFAULT 'base'::character varying NOT NULL,
    price integer DEFAULT 1000 NOT NULL
);


ALTER TABLE public.rates OWNER TO dunice;

--
-- Name: rates_id_seq; Type: SEQUENCE; Schema: public; Owner: dunice
--

CREATE SEQUENCE public.rates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rates_id_seq OWNER TO dunice;

--
-- Name: rates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dunice
--

ALTER SEQUENCE public.rates_id_seq OWNED BY public.rates.id;


--
-- Name: booking id; Type: DEFAULT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.booking ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- Name: rate_discounts id; Type: DEFAULT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.rate_discounts ALTER COLUMN id SET DEFAULT nextval('public.rate_discounts_id_seq'::regclass);


--
-- Name: rates id; Type: DEFAULT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.rates ALTER COLUMN id SET DEFAULT nextval('public.rates_id_seq'::regclass);


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: dunice
--

COPY public.booking (id, user_id, car_id, rental_start, rental_end, price) FROM stdin;
\.


--
-- Data for Name: rate_discounts; Type: TABLE DATA; Schema: public; Owner: dunice
--

COPY public.rate_discounts (id, percent, start_date, end_date, rate_id) FROM stdin;
1	5	5	9	1
2	10	10	17	1
3	15	18	29	1
\.


--
-- Data for Name: rates; Type: TABLE DATA; Schema: public; Owner: dunice
--

COPY public.rates (id, name, price) FROM stdin;
1	base	1000
\.


--
-- Name: booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunice
--

SELECT pg_catalog.setval('public.booking_id_seq', 4, true);


--
-- Name: rate_discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunice
--

SELECT pg_catalog.setval('public.rate_discounts_id_seq', 1, false);


--
-- Name: rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dunice
--

SELECT pg_catalog.setval('public.rates_id_seq', 1, false);


--
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id);


--
-- Name: rate_discounts rate_discounts_percent_key; Type: CONSTRAINT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.rate_discounts
    ADD CONSTRAINT rate_discounts_percent_key UNIQUE (percent);


--
-- Name: rate_discounts rate_discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.rate_discounts
    ADD CONSTRAINT rate_discounts_pkey PRIMARY KEY (id);


--
-- Name: rates rates_pkey; Type: CONSTRAINT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_pkey PRIMARY KEY (id);


--
-- Name: rate_discounts rate_discounts_rate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dunice
--

ALTER TABLE ONLY public.rate_discounts
    ADD CONSTRAINT rate_discounts_rate_id_fkey FOREIGN KEY (rate_id) REFERENCES public.rates(id);


--
-- PostgreSQL database dump complete
--


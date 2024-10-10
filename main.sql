CREATE TABLE Covid19 (
    covid_id SERIAL PRIMARY KEY,
    total_cases INT,
    total_deaths INT,
    total_recoveries INT,
    total_active_cases INT,
    total_new_cases INT
);


CREATE TABLE Country (
    country_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    num_cases INT,
    num_deaths INT,
    num_recoveries INT,
    num_active_cases INT,
    num_new_cases INT,
    covid_id INT,
    FOREIGN KEY (covid_id) REFERENCES Covid19(covid_id)
);


CREATE TABLE Account (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    language VARCHAR(20)
);


CREATE TABLE Graph (
    graph_id SERIAL PRIMARY KEY,
    username VARCHAR(20), 
    style INT,
    min_time TIMESTAMP NOT NULL,
    max_time TIMESTAMP NOT NULL,
    FOREIGN KEY (username) REFERENCES Account(username) ON DELETE CASCADE
);


CREATE TABLE FavoriteVisualizations (
    username VARCHAR(20), 
    graph_id INT,       
    PRIMARY KEY (username, graph_id),
    FOREIGN KEY (username) REFERENCES Account(username) ON DELETE CASCADE,
    FOREIGN KEY (graph_id) REFERENCES Graph(graph_id) ON DELETE CASCADE
);


CREATE TABLE Case (
    case_id SERIAL PRIMARY KEY,
    location VARCHAR(50),
    time TIMESTAMP,
    fatal BOOLEAN,
    country_id INT, 
    FOREIGN KEY (country_id) REFERENCES Country(country_id)
);


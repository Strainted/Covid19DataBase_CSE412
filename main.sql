CREATE TABLE Covid19 {
    total_id SERIAL PRIMARY KEY,
    total_cases INT,
    total_deaths INT,
    total_recoveries INT,
    total_active_cases INT,
    total_new_cases INT
};

CREATE TABLE Account {
    username VARCHAR(20) PRIMARY KEY,
    graph_id 
    password VARCHAR(20) NOT NULL,
    favorite_visualization 
}

CREATE TABLE Graph {
    graph_id SERIAL PRIMARY KEY,
    FOREIGN KEY (username) REFERENCES Account(username)
    style INT,
    min_time TIMESTAMP NOT NULL,
    max_time TIMESTAMP NOT NULL
};

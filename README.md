# Migrate from DHTMLX Scheduler to Bryntum Scheduler tutorial: starter repository

## Set up a MySQL database locally

First set up a MySQL database locally. We’ll install MySQL Server and MySQL Workbench. MySQL Workbench is a MySQL GUI that we’ll use to create a database with tables for the Scheduler data and to run queries. Download MySQL Server and MySQL Workbench from the MySQL community downloads page. If you’re using Windows, you can use the MySQL Installer to download the MySQL products. Use the default configurations when configuring MySQL Server and Workbench. Make sure that you configure the MySQL Server to start at system startup for convenience.

Open the MySQL Workbench desktop application. Open the local instance of the MySQL Server that you configured.

We’ll write our MySQL queries in the query tab and execute the queries by pressing the yellow lightning bolt button.

## Create a MySQL database for the DHTMLX data: Adding tables and example data

Let’s run some MySQL queries in MySQL Workbench to create, use, and populate a database for our DHTMLX Scheduler. Execute the following query to create a database called dhtmlx_bryntum_scheduler:


```sql
CREATE DATABASE dhtmlx_bryntum_scheduler;
```

Run the following query so that we set our newly created database for use:

```sql
USE dhtmlx_bryntum_scheduler;
```

Let’s create the two tables that we’ll need for our DHTMLX Scheduler data: dhtmlx_scheduler_events and dhtmlx_scheduler_resources:

```sql
CREATE TABLE `dhtmlx_scheduler_events` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `text` varchar(255) NOT NULL,
    `start_date` datetime NOT NULL,
    `end_date` datetime NOT NULL,
    `resource_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
```


```sql
CREATE TABLE `dhtmlx_scheduler_resources` (
    `resource_id` int(11) NOT NULL AUTO_INCREMENT,
    `resource_name` varchar(255) NOT NULL,
    PRIMARY KEY (`resource_id`)
);
```

Now add some example events data to the dhtmlx_scheduler_events table:

```sql
INSERT INTO `dhtmlx_scheduler_events` (id, text, start_date, end_date, resource_id)
VALUES (1, 'Meet new client', '2024-01-08 08:00:00', '2024-01-08 12:00:00', 1),
       (2, 'Sprint planning', '2024-01-08 09:00:00', '2024-01-08 11:00:00', 2),
       (3, 'Marketing meeting', '2024-01-08 10:00:00', '2024-01-08 13:00:00', 3),
       (4, 'Interview', '2024-01-08 16:00:00', '2024-01-08 17:00:00', 4),
       (5, 'Presentation', '2024-01-08 15:00:00', '2024-01-08 17:00:00', 5),
       (6, 'Board meeting', '2024-01-08 14:00:00', '2024-01-08 15:00:00', 1),
       (7, 'Conference', '2024-01-08 13:00:00', '2024-01-08 15:00:00', 2),
       (8, 'Sales training', '2024-01-08 15:30:00', '2024-01-08 16:30:00', 3),
       (9, 'Presentation', '2024-01-08 13:00:00', '2024-01-08 15:00:00', 4),
       (10, 'Interview', '2024-01-08 09:00:00', '2024-01-08 10:00:00', 5);
```

Add some example resources data to the dhtmlx_scheduler_resources table:

```sql
INSERT INTO `dhtmlx_scheduler_resources` (resource_id, resource_name)
VALUES (1, 'Frank'),
       (2, 'Rose'),
       (3, 'John'),
       (4, 'Matilda'),
       (5, 'Ben'),
       (6, 'Natalie');
```

## Get the DHTMLX Scheduler PRO trial code

The tutorial uses The [Timeline view](https://docs.dhtmlx.com/scheduler/timeline_view.html) of the DHTMLX Scheduler. This view shows a resources column on the left hand side of the scheduler, like the Bryntum Scheduler does. This view is only available in the Scheduler PRO version. You can download a free 30-day trial of the PRO version [here](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml).

Once you've downloaded the trial code, copy the `dhtmlxscheduler.js` and `dhtmlxscheduler_material.css` files from the `codebase` folder and add them to the `public` folder of this repository.


## Install the dependencies and add the MySQL database connection details

Install the dependencies by running the following command:

```
npm install
```
In the server.js` file, the Express server uses the MySQL2 library to connect to MySQL and run queries.


The `serverConfig` function runs when the server is started. It connects to the MySQL database. It also has some helper functions that are used for CRUD operations.


The `index.html` file in the public folder contains the HTML, CSS, and JavaScript for our DHTMLX Scheduler. We load the DHTMLX Scheduler JavaScript and CSS from the DHTMLX code that we copid into the `public` folder. The scheduler is initialized using the `init` method.

Now create a `.env` file in the root folder and add the following lines for connecting to your MySQL database:

```
HOST=localhost
PORT=1337
MYSQL_USER=root
PASSWORD=your-password
DATABASE=dhtmlx_bryntum_scheduler
```

Don’t forget to add the root password for your MySQL server.
Run the local dev server by running the command following command:

```bash
npm start
```

You’ll see a DHTMLX Scheduler with ten events. The scheduler will have full CRUD functionality.
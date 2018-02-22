#!/bin/bash

# Create Models

node_modules/.bin/sequelize model:generate --name Pais --attributes id:string,glosa:string,estatus:enum
node_modules/.bin/sequelize model:generate --name Region --attributes id:bigint,glosa:string,estatus:enum
node_modules/.bin/sequelize model:generate --name Comuna --attributes id:bigint,glosa:string,estatus:enum
node_modules/.bin/sequelize model:generate --name Direccion --attributes id:bigint,userId:string,direccion1:string,direccion2:string,estatus:enum
node_modules/.bin/sequelize model:generate --name Profesional --attributes id:bigint,userId:string,cargo:string,estatus:enum
node_modules/.bin/sequelize model:generate --name Categoria --attributes id:bigint,glosa:string,estatus:enum
node_modules/.bin/sequelize model:generate --name Servicio --attributes id:bigint,glosa:string,valorBase:float,estatus:enum
node_modules/.bin/sequelize model:generate --name EntregaServicio --attributes id:bigint,tipoEntrega:enum,valor:float,estatus:enum

# Insert init data 

node_modules/.bin/sequelize seed:generate --name paises
node_modules/.bin/sequelize seed:generate --name regiones
node_modules/.bin/sequelize seed:generate --name comunas

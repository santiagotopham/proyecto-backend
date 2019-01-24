const queries = require('./dbQueries');

async function obtenerRegistrosPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/signups');

    let { dateTo, dateFrom } = crearFechas();

    let { result, message } = await getRegistrosPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de registros del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de registros del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerLoginsPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/logins');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getLoginsPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de logins del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de logins del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerRegistroProductosPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/products');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getRegistroProductosPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de registros de productos del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de registros de productos del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerRegistroPaquetesPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/packages');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getRegistroPaquetesPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de registros de paquetes del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de registros de paquetes del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerPedidosPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/ventas/pedidos');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getPedidosPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de pedidos del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de pedidos del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerTransaccionesPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/ventas/transactions');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getTransaccionesPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de transacciones del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de transacciones del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerVentaProductosPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/ventas/products');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getVentaProductosPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de productos vendidos del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de productos vendidos del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function obtenerVentaPaquetesPorMes(req, res) {
    console.info('Conexion GET entrante : /api/analytics/ventas/packages');

    let { dateTo, dateFrom } = crearFechas();
    
    let { result, message } = await getVentaPaquetesPorMes(dateTo, dateFrom);

    if(result){
        console.info(`Cantidad de paquetes vendidos del corriente mes: ${result}`);
        console.info('Preparando response');
        res.status(200).json({message: `Cantidad de paquetes vendidos del corriente mes: ${result}`});
    }
    else{
        console.info('No se encontraron datos');
        console.info('Preparando response');
        res.status(200).json({message});
    }
}

async function getRegistrosPorMes(dateTo, dateFrom){
    console.info(`Buscando registros de usuarios desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .usuarios
                .getSignUpsPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].count > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].count);
                    }
                    else{
                        console.info(`No hubo registros entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo registros entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics User: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getLoginsPorMes(dateTo, dateFrom){
    console.info(`Buscando logins de usuarios desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .usuarios
                .getLoginsPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].count > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].count);
                    }
                    else{
                        console.info(`No hubo logins entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo logins entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics User: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getRegistroProductosPorMes(dateTo, dateFrom){
    console.info(`Buscando registros de productos desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .productos
                .getRegistrosPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].count > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].count);
                    }
                    else{
                        console.info(`No hubo registros entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo registros entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics Products: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getRegistroPaquetesPorMes(dateTo, dateFrom){
    console.info(`Buscando registros de paquetes desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .paquetes
                .getRegistrosPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].count > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].count);
                    }
                    else{
                        console.info(`No hubo registros entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo registros entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics Package: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getPedidosPorMes(dateTo, dateFrom){
    console.info(`Buscando pedidos realizados desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .pedidos
                .getPedidosPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].count > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].count);
                    }
                    else{
                        console.info(`No hubo pedidos realizados entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo pedidos realizados entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics Pedido: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getTransaccionesPorMes(dateTo, dateFrom){
    console.info(`Buscando transacciones realizadas desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .pedidos
                .getTransactionsPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].count > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].count);
                    }
                    else{
                        console.info(`No hubo transacciones realizadas entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo transacciones realizadas entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics Pedido: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getVentaProductosPorMes(dateTo, dateFrom){
    console.info(`Buscando ventas de productos realizadas desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .pedidos
                .getProductsPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].sum > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].sum);
                    }
                    else{
                        console.info(`No hubo ventas de productos realizadas entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo ventas de productos realizadas entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics Pedido: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

async function getVentaPaquetesPorMes(dateTo, dateFrom){
    console.info(`Buscando ventas de paquetes realizadas desde ${dateTo} hasta ${dateFrom}`);
    let message = '';
    let result = await queries
                .pedidos
                .getPackagesPorFecha(dateTo, dateFrom)
                .then(data => {
                    if(data.rows[0].sum > 0) {
                        console.info(`Informacion obtenida`);
                        return Number(data.rows[0].sum);
                    }
                    else{
                        console.info(`No hubo ventas de paquetes realizadas entre ${dateTo} y ${dateFrom}`);
                        message = `No hubo ventas de paquetes realizadas entre ${dateTo} y ${dateFrom}`;
                        return null;
                    }
                })
                .catch(err => {
                    console.error(`Error en Query SELECT de Analytics Pedido: ${err}`);
                    message = 'Ocurrio un error al obtener la informacion';
                });
    return { result, message };
}

function crearFechas(){
    console.info('Creando fechas del mes actual');

    let dateTo = new Date();
    dateTo.setUTCDate(dateTo.getDate() - dateTo.getDate() + 1);
    dateTo.setUTCHours(0, 0, 0, 0);
    let dateFrom = new Date();
    dateFrom.setUTCMonth(1)
    dateFrom.setUTCDate(0);
    dateFrom.setUTCHours(23, 59, 59, 999);

    console.info('Fechas creadas');
    console.info(`Desde ${dateTo} hasta ${dateFrom}`);

    return { dateTo, dateFrom };
}

module.exports = {
    obtenerRegistrosPorMes,
    obtenerLoginsPorMes,
    obtenerRegistroProductosPorMes,
    obtenerRegistroPaquetesPorMes,
    obtenerPedidosPorMes,
    obtenerTransaccionesPorMes,
    obtenerVentaProductosPorMes,
    obtenerVentaPaquetesPorMes
}
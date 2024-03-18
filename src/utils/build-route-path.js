export function buildRoutePath(path) {
    // Buscar parametros
    const routeParametersRegex = /:([a-zA-Z]+)/g;

    // Substitui na rota para que capture os dados de cada parametro
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

    // Certifica de que a string começa com esse padrão
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
    
    return pathRegex;
}
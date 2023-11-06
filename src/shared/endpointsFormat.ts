import chalk from "chalk";

export const printEndpoints = (endpoints: any, hostname: string) => {
  const maxWidth = 80;
  const methodWidth = 6;
  const pipe = chalk.yellow("│");
  const pipeRight = chalk.yellow("┐");
  const pipeRightDown = chalk.yellow("┘");
  const pipeLeft = chalk.yellow("┌");
  const pipeLeftDown = chalk.yellow("└");
  const pipeLine = chalk.yellow("─");

  const formatRouteInfo = (
    method: string,
    url: string,
    maxWidth: number,
    hostname: string
  ) => {
    const maxUrlWidth = maxWidth - methodWidth - hostname.length - 7;

    const formattedMethod = method.padEnd(methodWidth);
    const formattedUrl = url.slice(0, maxUrlWidth).trim();

    const formattedUrlColor = chalk.greenBright(formattedUrl);
    const hostnameColor = chalk.grey(hostname);

    const spaces = " ".repeat(
      maxWidth -
        (formattedMethod.length + formattedUrl.length + hostname.length + 7)
    );

    return `${pipe} ${formattedMethod} ${pipe} ${hostnameColor}${formattedUrlColor}${spaces} ${pipe}`;
  };

  console.log(`\n${pipeLeft}${`${pipeLine}`.repeat(maxWidth - 2)}${pipeRight}`);
  console.log(`${pipe}${" ".repeat(maxWidth - 2)}${pipe}`);

  endpoints.forEach((endpoint: any) => {
    const routeInfo = formatRouteInfo(
      endpoint.methods.join(", "),
      endpoint.path,
      maxWidth,
      hostname
    );
    console.log(routeInfo);
  });

  console.log(`${pipe}${" ".repeat(maxWidth - 2)}${pipe}`);
  console.log(
    `${pipeLeftDown}${`${pipeLine}`.repeat(maxWidth - 2)}${pipeRightDown}`
  );
};

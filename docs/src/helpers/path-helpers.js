import { useBasepath } from "react-static";

const createPath = (path) => {
  if (/^\w+:/.test(path) || path.startsWith("#")) {
    return path;
  }
  const basePath = useBasepath(); // eslint-disable-line react-hooks/rules-of-hooks
  const head = basePath ? `/${basePath}/` : "/";
  const to = `${head}${path}`;
  return to.replace("//", "/");
};

export default createPath;

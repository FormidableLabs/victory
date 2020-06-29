import { useBasepath } from "react-static";

const createPath = path => {
  if (/^\w+:/.test(path) || path.startsWith("#")) {
    return path;
  }
  const basePath = useBasepath();
  const head = basePath ? `/${basePath}/` : "/";
  const to = `${head}${path}`;
  return to.replace("//", "/");
};

export default createPath;

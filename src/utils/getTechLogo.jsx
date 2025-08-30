import React from 'react';
import { 
  SiPython, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiReact, 
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiOracle,
  SiRedis,
  SiMicrosoftsqlserver,
  SiSqlite,
  SiMariadb,
} from "react-icons/si";

export const getTechLogo = (title, size = "w-40 h-40") => {
  const name = title.toLowerCase();
  const logoClass = `${size} opacity-20`;

  if (name.includes('python')) return <SiPython className={`${logoClass} text-blue-500`} />;
  if (name.includes('javascript')) return <SiJavascript className={`${logoClass} text-yellow-400`} />;
  if (name.includes('html')) return <SiHtml5 className={`${logoClass} text-orange-500`} />;
  if (name.includes('css')) return <SiCss3 className={`${logoClass} text-blue-400`} />;
  if (name.includes('react')) return <SiReact className={`${logoClass} text-cyan-400`} />;
  if (name.includes('angular')) return <SiAngular className={`${logoClass} text-red-500`} />;
  if (name.includes('vue')) return <SiVuedotjs className={`${logoClass} text-green-500`} />;
  if (name.includes('node')) return <SiNodedotjs className={`${logoClass} text-green-600`} />;
  if (name.includes('java')) return <SiOpenjdk className={`${logoClass} text-red-600`} />;
  if (name.includes('php')) return <SiPhp className={`${logoClass} text-purple-600`} />;
  
  if (name.includes('database') || name.includes('dbms') || name.includes('sql')) {
    return <SiMysql className={`${logoClass} text-blue-600`} />;
  }
  if (name.includes('mongodb')) return <SiMongodb className={`${logoClass} text-green-500`} />;
  if (name.includes('mysql')) return <SiMysql className={`${logoClass} text-blue-600`} />;
  if (name.includes('postgresql')) return <SiPostgresql className={`${logoClass} text-blue-400`} />;
  if (name.includes('oracle')) return <SiOracle className={`${logoClass} text-red-600`} />;
  if (name.includes('redis')) return <SiRedis className={`${logoClass} text-red-500`} />;
  if (name.includes('sql server')) return <SiMicrosoftsqlserver className={`${logoClass} text-blue-500`} />;
  if (name.includes('sqlite')) return <SiSqlite className={`${logoClass} text-blue-400`} />;
  if (name.includes('mariadb')) return <SiMariadb className={`${logoClass} text-brown-600`} />;

  return null;
};
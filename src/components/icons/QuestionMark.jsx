export default function QuestionMark({ className = '', width = "24", height = "24", viewbox = "0 0 24 24", invert = false, ...props }) {
  return (
    <>
      {invert ? (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewbox}
          fill="currentColor"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 13a1 1 0 0 0 -.993 .883l-.007 .117l.007 .127a1 1 0 0 0 1.986 0l.007 -.117l-.007 -.127a1 1 0 0 0 -.993 -.883zm1.368 -6.673a2.98 2.98 0 0 0 -3.631 .728a1 1 0 0 0 1.44 1.383l.171 -.18a.98 .98 0 0 1 1.11 -.15a1 1 0 0 1 -.34 1.886l-.232 .012a1 1 0 0 0 .111 1.994a3 3 0 0 0 1.371 -5.673z" />
        </svg>
      ) :
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewbox}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 17l0 .01" />
          <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
        </svg>
      }
    </>
  );
}
const DisabledIcon = (props) => (
    <svg style={{opacity: '0.2'}} id="arrow_loading" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M17.5 3.33301V9.99967" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 10V16.6667" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 10C17.5 5.85787 14.1421 2.5 10 2.5C7.88104 2.5 5.96733 3.37873 4.60338 4.79167M2.5 10C2.5 14.1421 5.85787 17.5 10 17.5C12.0232 17.5 13.8592 16.6989 15.2083 15.3966" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const Icon = ({ disabled, ...props }) =>
  disabled ? (
    <DisabledIcon {...props} />
  ) : (
      <svg id="arrow_loading" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M17.5 3.33301V9.99967" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 10V16.6667" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 10C17.5 5.85787 14.1421 2.5 10 2.5C7.88104 2.5 5.96733 3.37873 4.60338 4.79167M2.5 10C2.5 14.1421 5.85787 17.5 10 17.5C12.0232 17.5 13.8592 16.6989 15.2083 15.3966" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  )

export default Icon

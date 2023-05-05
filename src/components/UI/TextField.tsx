import MUITextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import variables from "../../../styles/Variables.module.scss"


const TextField = styled(MUITextField)({
    '& label.Mui-focused': {
      color: variables.accentColor,
    },
    "& label":{
      color: variables.accentColor,
      backgroundColor: "transparent",
      zIndex: 1,
      whiteSpace: "pre",
      paddingLeft: "10px"
    },
    '& div ': {
      color: variables.accentColor,
      backgroundColor: variables.secondaryColor,
      borderRadius: "7px 7px 0 0",
    },
    "& input, textarea":{
      padding: "10px !important"
    },
    '& div.Mui-focused': {
      backgroundColor: variables.secondaryColor ,
      color: variables.accentColor,
    },
    "& .MuiInputBase-root::after":{
      borderBottomColor: variables.accentColor,
      borderbottomWidth: "thin",
      backgroundColor: variables.secondaryColor
    },
    "&:hover .MuiInputBase-root::before":{
      borderBottomColor: variables.primaryColor,
      borderbottomWidth: "thin",
    },
    "&:hover .MuiInputBase-root":{
      backgroundColor: variables.secondaryColor
    }
  });

export default TextField;
import React, { Fragment, useState } from 'react'; 

import { 
    Grid, Paper, TextField, Button, IconButton, 
    Typography, SvgIcon, InputAdornment
} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles'; 

import AddIcon from '@material-ui/icons/Add'; 
import InfoIcon from '@material-ui/icons/Info';

import { useCount } from '../SharedContext';
import { createLink } from '../../lib/db'; 

import UrlInput from './UrlInput'; 
import TesterComponent from '../TesterComponent'; 
import OtherOptionsButtonGroup from '../OtherOptionsButtonGroup';
import SocialMediaButtonGroup from '../SocialMediaButtonGroup';
import NicknameDisplay from './NicknameDisplay'; 
import ModeSelector from './ModeSelector'; 

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        marginTop: '5px',
    },
     paperPurple: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.dark,
    },
    buttonGroupPaper: {
        backgroundColor: '#fff',
        padding: theme.spacing(0.3),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    paperContainer: {
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(1),
    },
    tagsButton: {
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
    },
}));

//  const NicknameDisplay = () => {
//      const [state, dispatch] = useCount();

//     const handleChange = (inputValue) => {
//         const sanitizedValue = sanitizeInput(inputValue);

//         dispatch({
//             type: "UPDATE_NICKNAME",
//             payload: {
//                 value: sanitizedValue,
//             },
//         });
//     }

//     const handleInfoButtonClick = () => {
//         alert('Info Button Clicked'); 
//     }

//     const sanitizeInput = (input) => {
//         if(input.charAt(input.length-1) === ' ') {
//             return input.substring(0, input.length-1);
//         } else if(input.length > 20) {
//             //dispatch snackbar here 
//             return input.substring(0, 20);
//         }
//         return input; 
//     }

//     return (
//         <Grid container direction="row" justify="space-between" spacing={1}>
//             <Grid item>
//                 <TextField
//                     name="urlInput"
//                     variant="outlined"
//                     color="primary"
//                     value={state.nickname}
//                     placeholder="@NameMe"
//                     onChange={(e) => handleChange(e.target.value)}
//                     InputProps={{
//                         endAdornment: 
//                             <InputAdornment position="end">
//                                 <IconButton 
//                                     margin="dense" 
//                                     onClick={() => handleInfoButtonClick()}
//                                 >
//                                     <InfoIcon />
//                                 </IconButton>
//                             </InputAdornment>,
//                     }}
//                     style={{ backgroundColor: '#fff', borderRadius: '5px' }}
//                 />
//             </Grid>
//         </Grid>
//     );
//  }

 function SubmitButton() {
    const [state, dispatch] = useCount(); 
    const [result, setResult] = useState(''); 
    
    const handleSubmit = async () => {
        console.log('about to create');
        const result = await createLink(state); 
        const updatedResultUrl = result.updatedUrl;

        console.log("About to dispatch: " + updatedResultUrl); 
        setResult(updatedResultUrl);

        dispatch({ 
            type: 'UPDATE_RESULTS', 
            payload: {
                value: updatedResultUrl,
                message: "New URL: " + (updatedResultUrl),
                key: new Date().getTime()
            }
        });
    }

    return (
        <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            margin="normal"
            onClick={() => handleSubmit()}
            style={{ marginLeft: '10px', marginTop: '5px' }}
        > 
            <Typography variant="button" color='textSecondary'> 
                Generate 
            </Typography>
        </Button>
    )
 }

 
const UrlModifierBase = ({ open, handleOpenDialog, handleCloseDialog }) => {
    const classes = useStyles(); 

    const [state, dispatch] = useCount(); 
   

    const handleClear = () => {
        dispatch({
            type: "CLEAR"
        });
    }

    return (
        <Paper elevation={5} className={classes.paperContainer}>
            <Grid container spacing={1} style={{ padding: '15px' }}>
                <Grid container direction="column" justify="flex-start" alignIitems="flex-end" wrap="no-wrap" spacing={1}>

                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                            <Grid item> 
                                <Paper elevation={5} className={classes.paperPurple}> 
                                    <NicknameDisplay />
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" className={classes.tagsButton}> 
                                    <AddIcon /> 
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Paper elevation={5} className={classes.paperPurple}>
                            <UrlInput />
                        </Paper>
                    </Grid> 

                <Grid item direction="row" wrap="no-wrap">
                        <Grid container direction="row">
                            <Grid item> 
                                <ModeSelector />
                            </Grid>
                            <Grid item> 
                                <TesterComponent />
                            </Grid>

                            <Grid item> 
                                <SocialMediaButtonGroup />
                            </Grid>  

                            <Grid item>
                                <OtherOptionsButtonGroup /> 
                            </Grid>                      
                        </Grid>
                    </Grid>

                    <div style={{ marginTop: '15px'}}>
                        <Grid item> 
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                <Grid item> 
                                    <Button 
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        margin="normal"
                                        onClick={() => handleClear()}
                                        style={{ marginLeft: '10px', marginTop: '5px' }}
                                    > 
                                        <Typography variant="button"> 
                                            Clear
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item > 
                                    <SubmitButton /> 
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>

                </Grid>
            </Grid>
        </Paper>
    );
}  

const UrlModifierHeader = () => {
    return (
        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
            <Paper elevation={10} style={{ marginRight: '20px', padding: '5px', marginTop: '15px', backgroundColor: 'white' }}>
                <Grid container  direction="row" justify="flex-end" alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="h1" style={{ fontSize: '48px', color: 'black' }}> 
                            URL Cutifier
                        </Typography>
                    </Grid> 
                    <Grid item>
                        <Paper elevation={5}>
                            <SvgIcon fontSize="large">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </SvgIcon>
                        </Paper>
                    </Grid> 
                </Grid>
            </Paper>
        </Grid>
        
    ); 
}

const UrlModifier = () => {
    const classes = useStyles(); 
    const [globalState, globalDispatch] = useCount(); 

    const [open, setOpen] = useState(false); 

    const handleOpenDialog = (name) => {
        setOpen(true);
    }
    const handleCloseDialog = () => {
        setOpen(false); 
    }
    const handleSubmitDialog = () => {
        alert('Submitting...');
        //todo dispatch here
        setOpen(false); 
    }

    // const googleContent = {
    //     title: 'Google Play Analytics',
    //     message: 'Google Play Analytics Tags',
    //     component: <GoogleAnalyticsForm /> 
    // }; 

    return (
        <Fragment>

            {/* <UrlModifierHeader /> */}
            
            <UrlModifierBase 
                open={open}
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
            />
            
            {/* <StyledSharedDialog
                open={open}
                handleClose={handleCloseDialog}
                handleSubmit={handleSubmitDialog}
                content={googleContent}
                noSubmissionReq={false}
            /> */}
            {/* <SharedSnackbar />  */}
        </Fragment>
    );
}

export default UrlModifier;
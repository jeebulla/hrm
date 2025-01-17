// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiStep from '@mui/material/Step'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    icon: 'tabler:home',
    title: 'Account Details',
    subtitle: 'Enter your Account Details'
  },
  {
    icon: 'tabler:user',
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    icon: 'tabler:link',
    title: 'Next Of Kins',
    subtitle: 'Add Next of Kin'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBottom: theme.spacing(6)
    }
  }
}))

const StepperCustomHorizontal = () => {
  // ** States
  const [email, setEmail] = useState('')
  const [google, setGoogle] = useState('')
  const [country, setCountry] = useState('')
  const [twitter, setTwitter] = useState('')
  const [username, setUsername] = useState('')
  const [lastName, setLastName] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [firstName, setFirstName] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [language, setLanguage] = useState([])

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // ** Hooks & Var
  const { settings } = useSettings()
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { direction } = settings

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleReset = () => {
    setEmail('')
    setGoogle('')
    setCountry('')
    setTwitter('')
    setUsername('')
    setLastName('')
    setFacebook('')
    setLinkedIn('')
    setLanguage([])
    setFirstName('')
    setActiveStep(0)
    setState({ ...state, password: '', password2: '' })
  }

  // Handle Password
  const handlePasswordChange = prop => event => {
    setState({ ...state, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setState({ ...state, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }

  // Handle Language
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={4} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='First name'
                value={username}
                placeholder='john.doe'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                value={email}
                placeholder='johndoe@email.com'
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='User name'
                value={state.password}
                id='stepper-custom-horizontal-account-password'
                onChange={handlePasswordChange('password')}
                type={state.showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={state.password2}
                label='Confirm Password'
                id='stepper-custom-horizontal-account-password-2'
                onChange={handleConfirmChange('password2')}
                type={state.showPassword2 ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                      >
                        <Icon fontSize='1.25rem' icon={state.showPassword2 ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid> */}
            <Grid item xs={4} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='User name'
                value={username}
                placeholder='john.doe'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Employee ID'
                placeholder=''
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Department'
                id='stepper-custom-horizontal-personal-select'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='MEDICAL DIRECTOR'> MEDICAL DIRECTOR</MenuItem>
                <MenuItem value='FINANCE/ADMIN DIRECTOR'> FINANCE/ADMIN DIRECTOR</MenuItem>
                <MenuItem value='EMBRYOLOGIST'>EMBRYOLOGIST</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
                <MenuItem value=' CALL CENTER OFFICER'>CALL CENTER OFFICER</MenuItem>
                <MenuItem value=' QUALITY ASSURANCE/ISO COORDINATOR'>QUALITY ASSURANCE/ISO COORDINATOR</MenuItem>
                <MenuItem value=' SUPERVISOR CLINICAL LAB'>SUPERVISOR CLINICAL LAB</MenuItem>
                <MenuItem value=' HOUSEKEEPER'> HOUSEKEEPER</MenuItem>
                <MenuItem value='PHARMACY ASSISTANT'>PHARMACY ASSISTANT</MenuItem>
                <MenuItem value='SUPERVISOR-CASHIER'> SUPERVISOR-CASHIER</MenuItem>
                <MenuItem value='HMO BILLING OFFICER'>HMO BILLING OFFICER</MenuItem>
                <MenuItem value='BRAND MANAGER/EA'>BRAND MANAGER/EA</MenuItem>
                <MenuItem value='PROCUREMENT OFFICER (CATETERIA)'>PROCUREMENT OFFICER (CATETERIA)</MenuItem>
                <MenuItem value='LOGISTIC OFFICER'>LOGISTIC OFFICER</MenuItem>
                <MenuItem value='SUPERVISION-PHARMACY'>SUPERVISION-PHARMACY</MenuItem>
                <MenuItem value='STEWARD'>STEWARD</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Gross salary'
                placeholder='023'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Bank name'
                placeholder='GTB'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Account number'
                placeholder='1244134r4r'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
          </Fragment>
        )

      case 1:
        return (

          //   <Fragment key={step}>
          //     <Grid item xs={12} sm={6}>
          //       <CustomTextField
          //         fullWidth
          //         label='Employee ID'
          //         placeholder=''
          //         value={firstName}
          //         onChange={e => setFirstName(e.target.value)}
          //       />
          //     </Grid>
          //     <Grid item xs={12} sm={6}>
          //       <CustomTextField
          //         fullWidth
          //         label='
          //         Department'
          //         id='stepper-custom-horizontal-personal-select'
          //         SelectProps={{
          //           value: country,
          //           onChange: e => setCountry(e.target.value)
          //         }}
          //       >
          //         <MenuItem value='MEDICAL DIRECTOR'> MEDICAL DIRECTOR</MenuItem>
          //         <MenuItem value='FINANCE/ADMIN DIRECTOR'> FINANCE/ADMIN DIRECTOR</MenuItem>
          //         <MenuItem value='EMBRYOLOGIST'>EMBRYOLOGIST</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //         <MenuItem value=' CALL CENTER OFFICER'>CALL CENTER OFFICER</MenuItem>
          //         <MenuItem value=' QUALITY ASSURANCE/ISO COORDINATOR'>QUALITY ASSURANCE/ISO COORDINATOR</MenuItem>
          //         <MenuItem value=' SUPERVISOR CLINICAL LAB'>SUPERVISOR CLINICAL LAB</MenuItem>
          //         <MenuItem value=' HOUSEKEEPER'> HOUSEKEEPER</MenuItem>
          //         <MenuItem value='PHARMACY ASSISTANT'>PHARMACY ASSISTANT</MenuItem>
          //         <MenuItem value='SUPERVISOR-CASHIER'> SUPERVISOR-CASHIER</MenuItem>
          //         <MenuItem value='HMO BILLING OFFICER'>HMO BILLING OFFICER</MenuItem>
          //         <MenuItem value='BRAND MANAGER/EA'>BRAND MANAGER/EA</MenuItem>
          //         <MenuItem value='PROCUREMENT OFFICER (CATETERIA)'>PROCUREMENT OFFICER (CATETERIA)</MenuItem>
          //         <MenuItem value='LOGISTIC OFFICER'>LOGISTIC OFFICER</MenuItem>
          //         <MenuItem value='SUPERVISION-PHARMACY'>SUPERVISION-PHARMACY</MenuItem>
          //         <MenuItem value='STEWARD'>STEWARD</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //         <MenuItem value='LAUNDRY OFFICER'>LAUNDRY OFFICER</MenuItem>
          //       </CustomTextField>
          //     </Grid>
          //     {/* <Grid item xs={12} sm={6}>
          //       <CustomTextField
          //         select
          //         fullWidth
          //         label='Country'
          //         id='stepper-custom-horizontal-personal-select'
          //         SelectProps={{
          //           value: country,
          //           onChange: e => setCountry(e.target.value)
          //         }}
          //       >
          //         <MenuItem value='UK'>UK</MenuItem>
          //         <MenuItem value='USA'>USA</MenuItem>
          //         <MenuItem value='Australia'>Australia</MenuItem>
          //         <MenuItem value='Germany'>Germany</MenuItem>
          //       </CustomTextField>
          //     </Grid> */}
          //     <Grid item xs={12} sm={6} md={3}>
          //       <CustomTextField
          //         fullWidth
          //         label='Gross salary'
          //         placeholder='0'
          //         value={firstName}
          //         onChange={e => setFirstName(e.target.value)}
          //       />
          //     </Grid>
          //     <Grid item xs={12} sm={6} md={3}>
          //       <CustomTextField
          //         fullWidth
          //         label='Bank name'
          //         placeholder='GTB'
          //         value={firstName}
          //         onChange={e => setFirstName(e.target.value)}
          //       />
          //     </Grid>
          //     <Grid item xs={12} sm={6} md={3}>
          //       <CustomTextField
          //         fullWidth
          //         label='Account number'
          //         placeholder='0157674175'
          //         value={firstName}
          //         onChange={e => setFirstName(e.target.value)}
          //       />
          //     </Grid>
          //  /Fragment>
          <Fragment key={step}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Relationship Status'
                id='stepper-custom-horizontal-personal-select'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='MEDICAL DIRECTOR'>Single</MenuItem>
                <MenuItem value='FINANCE/ADMIN DIRECTOR'>Married</MenuItem>
                <MenuItem value='EMBRYOLOGIST'>Divorced</MenuItem>
                <MenuItem value='LAUNDRY OFFICER'>Widowed</MenuItem>
                <MenuItem value=' CALL CENTER OFFICER'>Prefer not to say</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Emergency Contact'
                placeholder='2345'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Relationship'
                placeholder='brother'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='
                Genotype
          '
                id='stepper-custom-horizontal-personal-select'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='AA'>AA</MenuItem>
                <MenuItem value='AC'>AC</MenuItem>
                <MenuItem value='BS'>AS</MenuItem>
                <MenuItem value='CC'>CC</MenuItem>
                <MenuItem value='SC'>SC</MenuItem>
                <MenuItem value='SS'>SS</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='
          Blood Group
          '
                id='stepper-custom-horizontal-personal-select'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='A+'>A+</MenuItem>
                <MenuItem value='A-'>A-</MenuItem>
                <MenuItem value='B+'>B+</MenuItem>
                <MenuItem value='B-'>B-</MenuItem>
                <MenuItem value=' CALL CENTER OFFICER'>Prefer not to say</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Allegies'
                id='stepper-custom-horizontal-personal-select'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='No option'></MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label=' RSA Comapanys'
                placeholder='2345'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label=' RSA number'
                placeholder='2345'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Password'
                placeholder=''
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
          </Fragment>
        )

      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={4} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='First name'
                value={username}
                placeholder='john.doe'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Full name'
                value={username}
                placeholder='john.doe'
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                value={email}
                placeholder='johndoe@email.com'
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                type='text'
                label='Occupation'
                value={email}
                placeholder=''
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                type='text'
                label='Phone'
                value={email}
                placeholder=''
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                type='text'
                label='Relationship'
                value={email}
                placeholder=''
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='tonal' color='secondary' disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant='contained' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={
              !smallScreen ? <Icon icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} /> : null
            }
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                          ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step.icon} />
                      </RenderAvatar>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperCustomHorizontal

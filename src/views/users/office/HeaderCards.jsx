import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import { useAppDispatch, useAppSelector } from '../../../hooks'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { deleteDepartment, fetchDepartments } from '../../../store/apps/departments/asyncthunk'
import { useDepartments } from '../../../hooks/useDepartments'
import paper from 'src/@core/theme/overrides/paper'

const DepartmentInfo = ({ departments, active, inActive }) => {
  // ** Hook
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const [DepartmentsData, loadingDepartments, paging, aggregations] = useDepartments()

  useEffect(() => {
    dispatch(fetchDepartments({ page: 1, limit: 10 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={3} sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Total Departments</Typography>

            <CustomAvatar
              skin='light'
              variant='rounded'
              color={'info'}
              sx={{ mr: 2, mt: 5, p: 1.5, width: 45, height: 45, borderRadius: 4, selfAlign: 'end' }}
            >
              <Icon fontSize='1.7rem' icon='arcticons:emoji-department-store' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.total || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Active Departments</Typography>
            <CustomAvatar
              skin='light'
              color={'success'}
              variant='rounded'
              sx={{ mt: 5, p: 1.5, width: 45, height: 45, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='1.7rem' icon='codicon:vm-active' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.total_active || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Inactive Departments</Typography>
            <CustomAvatar
              skin='light'
              color={'error'}
              variant='rounded'
              sx={{ mr: 2, mt: 5, p: 1.5, width: 45, height: 45, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='1.7rem' icon='material-symbols-light:inactive-order' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.total_deleted || 0}
          </Typography>
        </Card>
      </Grid>

      <Grid item md={3}>
        <Card sx={{ px: 5, pb: 5, pt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>Total Staff</Typography>

            <CustomAvatar
              skin='light'
              variant='rounded'
              color={'warning'}
              sx={{ mr: 2, mt: 5, p: 1.5, width: 45, height: 45, borderRadius: 4, selfAlign: 'center' }}
            >
              <Icon fontSize='1.7rem' icon='tabler:user-cog' />
            </CustomAvatar>
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              mt: -4,
              ml: 1
            }}
          >
            {aggregations?.total_staff || 0}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DepartmentInfo

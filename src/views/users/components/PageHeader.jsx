// import { Dispatch, SetStateAction, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PageHeader = ({ toggle, action }) => {
  return (
    <Box
      sx={{
        // py: 4,
        // px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'

        // justifyContent: 'flex-end',
      }}
    >
      {/* <Stack direction='row' justifyContent='space-between' spacing={4}>
        <RangePicker
          onCalendarChange={onCalendarChange}
          value={[dayjs(startDate, 'YYYY-MM-DD'), dayjs(endDate, 'YYYY-MM-DD')]}
          className='range-picker ms-50 w-100'
        />
        <Button color='primary' variant='tonal' startIcon={<Icon icon='tabler:filter' />} onClick={filterExpenditure}>
          Filter
        </Button>
      </Stack>
      <CustomTextField
        value={value}
        sx={{ mr: 4 }}
        placeholder='Search Expenditures'
        onChange={e => handleFilter(e.target.value)}
      /> */}

      <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        {action}
      </Button>
    </Box>
  )
}

export default PageHeader

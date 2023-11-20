import React, { useEffect, useState } from 'react'
import {useSession} from 'next-auth/react'
import { Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    BarElement,
    Title,    
    Tooltip, 
    Legend 
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import { getDirectories } from '@/utils/dbQueries'
import { useQuery } from 'react-query'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

type props = {
    session : any
}
export const BarChart = ({ session } : props) => {
    //session
    // const { data: session, status } = useSession()   
    const [chartData, setChartData] = useState<any>({
        datasets : []
    })
    const [chartOptions, setChartOptions] = useState({})

    
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))
    
    //AUXILIAR VARIABLES TO CLASSIFY CHART DATA
    const today = new Date()
    const currentMonth = new Date(today.getFullYear(),today.getMonth(),1)
    const lastMonth = new Date(today.getFullYear(), today.getMonth()-1, 1)
       

    useEffect(() => {
        setChartData({
            labels : ['NOTES', 'JOURNAL', 'CONFESSION', 'LETTER', 'BUSINESS', 'PERSONAL'],
            datasets : [
                {                
                    label : 'Last month',
                    data : [
                        directories?.filter(dir=>dir.type==='NOTE' && (new Date(dir.updateDate)>lastMonth && new Date(dir.updateDate)<currentMonth)).length,
                        directories?.filter(dir=>dir.type==='JOURNAL' && (new Date(dir.updateDate)>lastMonth && new Date(dir.updateDate)<currentMonth)).length,
                        directories?.filter(dir=>dir.type==='CONFESSION' && (new Date(dir.updateDate)>lastMonth && new Date(dir.updateDate)<currentMonth)).length,
                        directories?.filter(dir=>dir.type==='LETTER' && (new Date(dir.updateDate)>lastMonth && new Date(dir.updateDate)<currentMonth)).length,
                        directories?.filter(dir=>dir.type==='BUSINESS' && (new Date(dir.updateDate)>lastMonth && new Date(dir.updateDate)<currentMonth)).length,
                        directories?.filter(dir=>dir.type==='PERSONAL' && (new Date(dir.updateDate)>lastMonth && new Date(dir.updateDate)<currentMonth)).length,
                    ],
                    borderColor: 'rgb(53, 60, 235)',
                    backgroundColor : 'rgb(53, 60, 235, 0.4)'
                },
                {
                label : 'Current month',
                data : [
                    directories?.filter(dir=>dir.type==='NOTE' && new Date(dir.updateDate)>currentMonth).length,
                    directories?.filter(dir=>dir.type==='JOURNAL' && new Date(dir.updateDate)>currentMonth).length,
                    directories?.filter(dir=>dir.type==='CONFESSION' && new Date(dir.updateDate)>currentMonth).length,
                    directories?.filter(dir=>dir.type==='LETTER' && new Date(dir.updateDate)>currentMonth).length,
                    directories?.filter(dir=>dir.type==='BUSINESS' && new Date(dir.updateDate)>currentMonth).length,
                    directories?.filter(dir=>dir.type==='PERSONAL' && new Date(dir.updateDate)>currentMonth).length,
                ],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor : 'rgb(53, 162, 235, 0.4)'
                },
            ]
        })
        setChartOptions({
            plugins : {
                legend: {
                    position : 'top'
                },
                title : {
                    display : true,
                    text : 'Directories amount'
                }
            },
            mantainAspectRatio : false,
            responsive : true
        })
        refetch()
    }, [isLoading])
  return (
    <>
    {isLoading ? null : (

        <div className='w-full md:col-span-2 relative lg:h-[50vh] h-[40vh] m-auto p-4 border rounded-lg bg-white'>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    )}
    </>
  )
}

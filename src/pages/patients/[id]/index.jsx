/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";
import Link from 'next/link'

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable/ActionsTable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import { UnderlinedTabs } from "../../../components/elements/tabs";
import FoodPlanCalendar from "../../../components/partials/food-plan-calendar/calendar";

import { FiPlus, FiCalendar,FiEdit, FiPrinter, FiSend, FiTrash } from 'react-icons/fi';
import { AiFillFileExcel, AiFillFilePdf } from "react-icons/ai"

//Services
import patientsService from "../../../services/patients";

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

export default function PatientDetails({ patient, stravaStats }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const handlerEdit = () => { }

  const TabGeneral = ({ stravaStats }) => {
    return (<>
      <div className="table table-auto w-full">
        <div className="table-row-group">

          <div className="table-row" >
            <div className="table-cell whitespace-nowrap px-2 text-sm">
              Name
            </div>
            <div className="table-cell px-2 whitespace-normal">
              {patient.name}
            </div>
          </div>

          <div className="table-row" >
            <div className="table-cell whitespace-nowrap px-2 text-sm">
              Strava ID
            </div>
            <div className="table-cell px-2 whitespace-normal">
              <Link href={`https://www.strava.com/athletes/${patient.strava_id}`}>
                <a target="_blank">{patient.strava_id}</a>
              </Link>
            </div>
          </div>

          <div className="table-row" >
            <div className="table-cell whitespace-nowrap px-2 text-sm">
              Status
            </div>
            <div className="table-cell px-2 whitespace-normal">
              {patient.status}
            </div>

          </div>

          <div className="table-row" >
            <div className="table-cell whitespace-nowrap px-2 text-sm">
              Total Distance
            </div>

            <div className="table-cell px-2">
              {stravaStats.ytd_run_totals.distance / 1000} Km
            </div>
          </div>

        </div>
      </div> </>
    );
  }

  const TabActivities = ({ stravaMostRecentRide,
    stravaMostRecentRun,
    stravaStats }) => {
    // <StravaStats
    //         stravaStats={stravaStats}
    //         stravaMostRecentRun={stravaMostRecentRun}
    //         stravaMostRecentRide={stravaMostRecentRide}
    //       />



  }

  const TabTask = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Description",
          accessor: "desc"
        },
        {
          Header: "Start",
          accessor: "start"
        },
        {
          Header: "Due Date",
          accessor: "dueDate"
        },
        {
          Header: "Assigned",
          accessor: "assigned"
        },
        {
          Header: "Priority",
          accessor: "priority"
        },
        {
          Header: "Status",
          accessor: "status",
        }
      ],
      []
    );
    const data = [
      {
        id: 1,
        desc: "Processo de Candidaturas",
        start: "2021-08-01",
        dueDate: "2021-08-12",
        status: "Aberto",
        priority: "Maxima",
        assigned: "DAF"
      },
      {
        id: 3,
        desc: "Gestão do Contrato",
        start: "2021-08-16",
        dueDate: "2021-09-15",
        status: "Aberto",
        priority: "Maxima",
        assigned: "Finanças"
      },
      {
        id: 4,
        desc: "Cobrança 1ª Prestação",
        start: "2021-09-25",
        dueDate: "2021-10-05",
        status: "Aberto",
        priority: "Media",
        assigned: "Finanças"
      },
      {
        id: 5,
        desc: "Cobrança 2ª Prestação",
        start: "2021-10-25",
        dueDate: "2021-11-05",
        status: "Aberto",
        priority: "Media",
        assigned: "Finanças"
      },
      {
        id: 6,
        desc: "Cobrança 3ª Prestação",
        start: "2021-11-25",
        dueDate: "2021-12-05",
        status: "Aberto",
        priority: "Media",
        assigned: "Finanças"
      },
    ];

    return <Datatable columns={columns} data={data} link="/projects"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  }

  const TabFoodPlan = () => {
    const foodPlanCalendar = [
      [
        {
          title: 'Matabicho', start: '2021-11-29T08:00:00', end: '2021-11-29T10:00:00',
          className: 'bg-success'
        },
        {
          title: 'Almoço', start: '2021-11-30T12:00:00', end: '2021-11-30T14:00:00',
          className: 'bg-success'
        }
      ]
    ]
    return (
      <Widget
        title="Food Plan Calendar"
        description=""
        right=""
      >
        <FoodPlanCalendar initialEvents={foodPlanCalendar} />
      </Widget>


    );
  }

  const TabBill = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Date",
          accessor: "date"
        },
        {
          Header: "Document",
          accessor: "document"
        },
        {
          Header: "Customer",
          accessor: "customer"
        },
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Total",
          accessor: "total"
        },
        {
          Header: "Status",
          accessor: "status",
        }
      ],
      []
    );
    const data = [
      {
        id: 1,
        date: "2021-07-10",
        document: "VD 2021/1",
        customer: "C001",
        name: "Guimarães Mahota",
        total: "1000000",
        status: "pedding"
      }
    ];

    return <Datatable columns={columns} data={data} link="/projects"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  }


  const TabOther = () => {
    return <></>
  }


  const tabs = [
    {
      index: 0,
      title: "General",
      active: true,
      content: <TabGeneral stravaStats={stravaStats} />,
    },
    {
      index: 1,
      title: "Task's",
      active: false,
      content: <TabTask />,
    },
    {
      index: 2,
      title: "Food Plan",
      active: false,
      content: <TabFoodPlan />,
    },
    {
      index: 3,
      title: "Bill's",
      active: false,
      content: <TabBill />,
    },
    {
      index: 4,
      title: "Attachment's",
      active: false,
      content: <TabBill />,
    },
    {
      index: 5,
      title: "Other",
      active: false,
      content: <TabOther />,
    },

  ];

  function handlerCalendar() {
    router.push(`/patients/${patient.id}/calendar`)
  }

  return (
    <>
      <SectionTitle title="Patient" subtitle={`${patient.id} - ${patient.name}`} />
      <Widget
        title="Details"
        description={
          <span>
            {patient.name}
          </span>
        }
        right={
          <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">

            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button" onClick={handlerCalendar}>

              <FiCalendar className="stroke-current text-white" size={18} />
              <span>Activities</span>
            </button>

            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <FiEdit className="stroke-current text-white" size={18} />
              <span>Edit</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <FiPrinter className="stroke-current text-white" size={18} />
              <span>Print</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <FiSend className="stroke-current text-white" size={18} />
              <span>Send</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <AiFillFileExcel className="stroke-current text-white" size={18} />
              <span>CSV</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <AiFillFilePdf className="stroke-current text-white" size={18} />
              <span>PDF</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-red-500 hover:bg-red-600 text-white"
              type="button">

              <FiTrash className="stroke-current text-white" size={18} />
              <span>Remove</span>
            </button>
          </div>
        }
      >
        <UnderlinedTabs tabs={tabs} />
      </Widget>
    </>
  );
}


export const getServerSideProps = async (ctx) => {

  const { 'mls.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { id } = ctx.params;

  const patient = await patientsService.get_Id(id);

  const CLIENT_SECRET = publicRuntimeConfig.STRAVA_CLIENT_SECRET
  const STRAVA_CLIENT_REFRESH_TOKEN = publicRuntimeConfig.STRAVA_CLIENT_REFRESH_TOKEN
  const clientId = publicRuntimeConfig.STRAVA_CLIENT_Id

  const resToken = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${STRAVA_CLIENT_REFRESH_TOKEN}`,
    {
      method: 'POST',
    },
  )
  const {
    access_token: newToken,
    refresh_token: newRefreshToken,
  } = await resToken.json()

  const resStats = await fetch(
    `https://www.strava.com/api/v3/athletes/${patient.strava_id}/stats`,
    {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    },
  )

  const resActivities = await fetch(
    'https://www.strava.com/api/v3/athlete/activities?per_page=100',
    {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    },
  )

  const stravaStats = await resStats.json()
  const stravaActivies = await resActivities.json()

  console.log(stravaStats)

  return {
    props: {
      patient,
      stravaStats
    }
  };

};
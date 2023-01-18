import Head from 'next/head'
import styled, { useTheme } from 'styled-components'
import Card from './components/card.component';
import { useEffect, useState } from 'react';
import { device, textFlow } from '@/styles/helpers';
import { getJobs } from '@/utils/api';
import Filter from './components/filter.component';
import { useFilter } from '@/utils/filter.context';

export default function Home() {
  const theme = useTheme();
  const { filterProps, handleChangeFilter } = useFilter();
  const [jobs, setJobs] = useState<null | JobsType[]>(null);
  const [filteredJobs, setFilteredJobs] = useState<null | JobsType[]>(null);
  const [locationList, setLocationList] = useState<string[]>([]);
  const [levelList, setLevelList] = useState<string[]>([]);
  const [timeModelList, setTimeModelList] = useState<string[]>([]);
  const [jobsToShow, setJobsToShow] = useState<number>(4);

  useEffect(() => {
    if (jobs) {
      setFilteredJobs(jobs.filter((job) => {
        for (let key in filterProps) {
          if (job[key] === undefined || job[key] != filterProps[key] || !job[key].includes(filterProps[key])) return false;
        }
        return true;
      }))
    }
  }, [filterProps])

  const addToState = (ltList: string[], lvList: string[], tmList: string[], allJobs: JobsType[]) => {
    setLevelList(lvList);
    setLocationList(ltList);
    setTimeModelList(tmList);
    setJobs(allJobs);
    setFilteredJobs(allJobs);
  }

  useEffect(() => {
    if (!jobs) {
        getJobs({
          contentType: "job",
        }).then(res => {
          const allJobs: JobsType[] = [];
          res.map(data => {
            const locations: string[] = [];
            const levels: string[] = [];
            const title: string = data.fields.title;
            const type: string = data.fields.department.fields.title;
            const timeModel: string = data.fields.type.fields.title;

            data.fields.locations.forEach(l => locations.push(l.fields.city))
            data.fields.levels.forEach(lv => levels.push(lv.fields.title));

            allJobs.push({
              jobLocations: locations,
              jobLevels: levels,
              jobType: type,
              jobTimeModel: timeModel,
              jobTitle: title,
            });
          })

          const ltList: string[] = [];
          res.map(data => data.fields.locations.forEach(l => ltList.indexOf(l.fields.city) === -1 && ltList.push(l.fields.city)));
          const lvList: string[] = [];
          res.map(data => data.fields.levels.forEach(l => lvList.indexOf(l.fields.title) === -1 && lvList.push(l.fields.title)));
          const tmList: string[] = [];
          res.map(data => tmList.indexOf(data.fields.type.fields.title) === -1 && tmList.push(data.fields.type.fields.title));

          addToState(ltList, lvList, tmList, allJobs)
        });
    }
  }, []);

  const handleShowMore = () => setJobsToShow(old => old + 4);

  const Main = styled.main`
    background-color: ${theme.colors.grayScale.gray50};
    min-height: 100vh;
    font-family: "Gotham";
    padding-bottom: 7.125rem;
  `;
  const Title = styled.h1`
    color: ${theme.colors.secondary};
    ${textFlow(theme.fontSizes.displayMd)}
    margin-top: 1.125rem;
  `;
  const Subtitle = styled.h2`
    color: ${theme.colors.secondary};
    text-align: center;
    ${textFlow(theme.fontSizes.displaySm)}
  `;
  const OpenJobsTitle = styled.h4`
    ${textFlow(theme.fontSizes.textMd)}
    color: ${theme.colors.primary};
    margin: 0;
  `;
  const Header = styled.header`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${theme.colors.grayScale.gray75};
    width: 100%;
    padding-bottom: ${filterProps.jobLocations || filterProps.jobLevels || filterProps.jobTimeModel ? 0 : "5rem"};
    padding-top: 8.125rem;
  `;

  const Button = styled.button`
    background-color: ${theme.colors.primaryScale.primary75};
    border-radius: 1rem;
    text-align: center;
    display: block;
    padding: 0.75rem 1.062rem;
    margin: 1.25rem auto;
    color: ${theme.colors.primary};
    ${textFlow(theme.fontSizes.textSm)}
    font-family: Gotham;
    border: 0;
    cursor: pointer;
  `;

  const JobsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 824px;
    margin: auto;
    @media ${device.mobileAndTablet} {
      max-width: 100%;
    }
  `;

  return (
    <>
      <Head>
        <title>Hello Friend - Home</title>
        <meta name="description" content="Just an challange" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header>
          {jobs && <OpenJobsTitle>{jobs.length} offene Stellen bei Creditplus</OpenJobsTitle>}
          <Title>Hier beginnt deine Zukunft</Title>
          {jobs && <Filter locationsList={locationList} levelList={levelList} timeModelList={timeModelList}/>}
          {(filterProps.jobLocations || filterProps.jobLevels || filterProps.jobTimeModel) && <Button onClick={() => {
            handleChangeFilter();
            setJobsToShow(4);
          }}>Filter zurücksetzen</Button>}
        </Header>
        <Subtitle>Aktuelle Jobangebote ({filteredJobs?.length})</Subtitle>
        <JobsContainer>
          {filteredJobs?.slice(0, jobsToShow).map((job, key) => {
            const {jobTitle, jobType, jobTimeModel, jobLocations} = job;
            const jobProps = {jobTitle, jobType, jobTimeModel, jobLocations}

            return <Card {...jobProps} key={key}/>
          })}
        </JobsContainer>
        {filteredJobs?.length > 4 && <Button onClick={handleShowMore}>Zeig mehr...</Button>}
      </Main>
    </>
  )
}

type JobsType = {
  jobTitle: string;
  jobTimeModel: string;
  jobLocations: string[];
  jobLevels: string[];
  jobType: string;
}
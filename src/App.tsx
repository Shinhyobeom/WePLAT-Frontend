import React, { useEffect, useState } from 'react';

import { ResumeResourceApiFactory, Resume, Configuration as ResumeConfiguration } from "./react-applicant-common";
import { JobPostingResourceApiFactory, JobPosting, Configuration as JobPostingConfiguration } from "./react-jobposting-common";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ApplicantGrid from './component/applicantGrid';
import JobGrid from './component/jobGrid';

function App() {
  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [jobData, setJobData] = useState<JobPosting[]>([]);

  useEffect(() => {
    // applicant backend Data
    const resumeApiConfig = new ResumeConfiguration({ basePath: "<Applicant URL>" }); // https://app.weplat.shop
    const resumeApi = ResumeResourceApiFactory(resumeApiConfig);
    resumeApi.getAllResumes(0, 10).then(async (res) => {
      const { data } = await resumeApi.getResume(1);
      console.log(res.data);
      setResumeData(res.data);
    });

    // job backend Data
    const jobPostingApiConfig = new JobPostingConfiguration({ basePath: "<Jobposting URL>" }); // https://job.weplat.shop
    const jobPostingApi = JobPostingResourceApiFactory(jobPostingApiConfig);
    jobPostingApi.getAllJobPostings(0, 10).then(async (res) => {
      const { data } = await jobPostingApi.getJobPosting(1);
      console.log(res.data);
      setJobData(res.data);
    });
  }, []);
 
  return (
    <div className="App">
      <header className="App-header">
       
        <Stack  direction="row">
          </Stack>
          <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Item>
                <Button variant="contained" color="success">채용사이트 관리자 페이지</Button>
            </Item>
            <ItemLeft>
                <Button variant="contained">Applicant App BackEnd Data - 이력서 정보</Button>
            </ItemLeft>
                <ApplicantGrid gridData={resumeData} ></ApplicantGrid>
            <Item></Item>
            <ItemLeft>
                <Button variant="contained">Jobposting App BackEnd Data - 채용공고 정보</Button>
            </ItemLeft>
                <JobGrid gridData={jobData} ></JobGrid>
            <Item>WePLAT Cloud Infra</Item>
          </Stack>
        </Box>
      </header>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemLeft = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default App;

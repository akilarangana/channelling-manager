import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './AccordianComponent.css';
import DrugDoseHistoryTableComponent from '../../../components/drug-dose-history-component/DrugDoseHistoryTableComponent';

export default function SimpleAccordion(visits) {

    console.log(visits);
    return (
        <div id="accordionId">
            <div id="previousVisitId">
                <lable><b>Previous Visits</b></lable>
            </div>

            {visits.visits && visits.visits.length > 0 && visits.visits.map((visit, index) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{visit.visitDate}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div id="visitSummaryMainId">
                                <div id="ptientSummaryCellId">
                                    <h5>Symptoms</h5>
                                    <div>
                                        <label>{visit.symptoms}</label>
                                    </div>
                                </div>
                                <div id="ptientSummaryCellId">
                                    <h5>Notes</h5>
                                    <div>
                                        <label>{visit.notes}</label>
                                    </div>
                                </div>
                                <div>
                                    <h5>Prescriptions</h5>
                                    <div>
                                        <DrugDoseHistoryTableComponent rows={visit.prescriptionList} />
                                    </div>
                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
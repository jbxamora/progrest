const { Project } = require('../models');

const projectData = [
    {
        project_id: '1',
        project_name: 'HelpMe',
        description:"Helping Me",
        impact_metrics: "5"
    },
    {
        project_id: '2',
        project_name: 'HelpYou',
        description:"Helping You",
        impact_metrics: "10"
    },
    {
        project_id: '3',
        project_name: 'HelpMyself',
        description:"Helping Myself",
        impact_metrics: "7"
    }
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;
const { Project } = require('../models');

const projectData = [
    {
        user_id: 1,
        project_name: 'HelpMe',
        description:"Helping Me",
        address:"1 Elm St., New York, NY",
        impact_metrics: 5
    },
    {
        user_id: 2,
        project_name: 'HelpYou',
        description:"Helping You",
        address:"2 Elm St., New York, NY",
        impact_metrics: 10
    },
    {
        user_id: 3,
        project_name: 'HelpMyself',
        description:"Helping Myself",
        address:"3 Elm St., New York, NY",
        impact_metrics: 7
    }
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;
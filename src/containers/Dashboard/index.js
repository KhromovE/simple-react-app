import React, { PropTypes } from 'react';
import NavBar from '../../components/NavBar';
import { Segment, Grid, Container } from 'semantic-ui-react';

import styles from './styles.scss';

import baseStyles from '../../assets/styles/base.scss';

const Dashboard = ({ children }) => (
  <div>
    <Segment vertical className={baseStyles['segment-without-border']}>
      <NavBar />
    </Segment>
    <Segment vertical className={`${styles['app-dashboard-content']} ${baseStyles['segment-without-border']}`}>
      <Container>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                {children}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Dashboard;

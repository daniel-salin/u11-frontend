import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  expansionPanel: {
    margin: '1em 0',
  },
  tableContainer: {
    margin: '1em 0',
  },
  linkText: {
    color: 'red',
    textDecoration: 'none',
  },
});

const Logs: NextPage<LogProps> = ({ logs }) => {
  const classes = useStyles();

  return (
    <Layout title="Logs">
      {logs ? (
        logs?.map((log) => {
          return (
            <>
              <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>{log.date}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Time Stamp</StyledTableCell>
                          <StyledTableCell>Path</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {log.images?.map((img: any) => (
                          <StyledTableRow key={img.timestamp}>
                            <StyledTableCell component="th" scope="row">
                              <Link
                                href={{
                                  pathname: '/image',
                                  query: { path: `${img.path}` },
                                }}
                              >
                                <a className={classes.linkText}>{img.timeStamp}</a>
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell>{img.path}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </>
          );
        })
      ) : (
        <Typography variant="h3">No Logs Available</Typography>
      )}
    </Layout>
  );
};

export interface LogProps {
  logs: Log[];
}

export interface Log {
  date: string;
  images: LogImages[];
}

export interface LogImages {
  timestamp: string;
  path: string;
}

export interface State {
  logs: { logs: Log[] };
}

const mapStateToProps = (state: State) => {
  return {
    logs: state.logs.logs,
  };
};

export default connect(mapStateToProps, null)(Logs);

import React from 'react';
import store from '../../store';
import plus from './plus.svg';
import './ReporterFAB.scss';
import { connect } from 'react-redux';

const toggle = () => store.dispatch({ type: 'REPORTER_TOGGLE' });

const ReporterFab = () => (
  <button className="reporter-fab" onClick={toggle}>
    <div>
      <img src={plus} alt="" height={25} width={25} />
      <span>Kreiraj članak</span>
    </div>
  </button>
);

const mapStateToProps = (store) => ({ isOpen: store.reporterOpen });

export default connect(mapStateToProps)(ReporterFab);

import React, { PureComponent } from 'react';
import Dimensions from './Dimensions';

import connectStateToGraph from './connectStateToGraph';
import SpiderGraph from './SpiderGraph';
export default class App extends PureComponent {
  render() {
    const { width, height } = Dimensions.get('window');
    const dimToUse = width > height ? height : width;
    return (
      <SpiderGraph
        { ...connectStateToGraph() }
        width={ dimToUse > 600 ? 600 : dimToUse }
        height={ dimToUse > 600 ? 600 : dimToUse }
        padding={ 120 }
        navigation={ {} }
        setEditingProduct={ () => {} }
      />
    );
  }
}

/**
 * @package scenes/SentimentView/GraphView
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
import React, { PureComponent } from 'react';
import Dimensions from '/imports/ui/components/Dimensions';
import connectStateToGraph from './connectStateToGraph';
import SpiderGraph from '/imports/ui/features/SpiderGraph';

export default class GraphView extends PureComponent {
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

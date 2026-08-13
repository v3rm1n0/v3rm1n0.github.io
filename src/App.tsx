import * as stylex from '@stylexjs/stylex';
import {Button} from '@astryxdesign/core/Button';

const styles = stylex.create({
  probe: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: 'rebeccapurple',
    color: 'white',
  },
});

export function App() {
  return (
    <div {...stylex.props(styles.probe)}>
      <p>StyleX is compiling if this box is purple with rounded corners.</p>
      <Button label="astryx is rendering if this is a styled button" />
    </div>
  );
}

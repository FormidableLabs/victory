import ga from 'react-ga';
import Radium, { Style } from 'radium';
import React from 'react';

import theme from './theme';

// Child components

// TODO: Extract these global Header/Footers into formidable-landers
// https://github.com/FormidableLabs/formidable-landers/issues/12
import Footer from "./footer";
import Header from "./header";

import Sidebar from "./sidebar";

@Radium
class Docs extends React.Component {

  componentWillMount() {
    ga.pageview('/victory/docs');
  }

  getDocsStyles() {
    return {
      margin: '1rem 0 0 0',
      padding: '1rem 0.5rem',
      '@media (min-width: 768px)': {
        flex: '1',
        margin: 0,
        padding: '40px 1rem',
        maxWidth: '640px' //Is it possible the copy can be this width & code + playground can be wider?
      }
    };
  }

  getMainStyles() {
    return {
      display: 'flex',
      flex: '1 0 auto',
      flexDirection: 'column',
      margin: '0 auto',
      padding: '1rem',
      '@media (min-width: 768px)': {
        'flexDirection': 'row'
      }
    }
  }

  render() {
    return (
      <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
        <Header/>
        <main style={this.getMainStyles()}>
          <Sidebar/>
          <section style={this.getDocsStyles()}>
            <h1>Story time</h1>
            <p>
              He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish. In the first forty days a boy had been with him. But after forty days without a fish the boy’s parents had told him that the old man was now definitely and finally salao, which is the worst form of unlucky, and the boy had gone at their orders in another boat which caught three good fish the first week. It made the boy sad to see the old man come in each day with his skiff empty and he always went down to help him carry either the coiled lines or the gaff and harpoon and the sail that was furled around the mast. The sail was patched with flour sacks and, furled, it looked like the flag of permanent defeat.
            </p>
            <p>
              The old man was thin and gaunt with deep wrinkles in the back of his neck. The brown blotches of the benevolent skin cancer the sun brings from its reflection on the tropic sea were on his cheeks. The blotches ran well down the sides of his face and his hands had the deep-creased scars from handling heavy fish on the cords. But none of these scars were fresh. They were as old as erosions in a fishless desert.
            </p>
            <p>
              Everything about him was old except his eyes and they were the same color as the sea and were cheerful and undefeated.
            </p>
            <p>
              “Santiago,” the boy said to him as they climbed the bank from where the skiff was hauled up. “I could go with you again. We’ve made some money.”
            </p>
            <p>
              The old man had taught the boy to fish and the boy loved him.
            </p>
            <p>
              “No,” the old man said. “You’re with a lucky boat. Stay with them.”
            </p>
            <p>
              “But remember how you went eighty-seven days without fish and then we caught big ones every day for three weeks.”
            </p>
            <p>
              “I remember,” the old man said. “I know you did not leave me because you doubted.”
            </p>
            <p>
              “It was papa made me leave. I am a boy and I must obey him.”
            </p>
            <p>
              “I know,” the old man said. “It is quite normal.”
            </p>
            <p>
              “He hasn’t much faith.”
            </p>
            <p>
              “No,” the old man said. “But we have. Haven’t we?”
            </p>
            <p>
              “Yes,” the boy said. “Can I offer you a beer on the Terrace and then we’ll take the stuff home.”
            </p>
            <p>
              “Why not?” the old man said. “Between fishermen.”
            </p>
            <p> They sat on the Terrace and many of the fishermen made fun of the old man and he was not angry. Others, of the older fishermen, looked at him and were sad. But they did not show it and they spoke politely about the current and the depths they had drifted their lines at and the steady good weather and of what they had seen. The successful fishermen of that day were already in and had butchered their marlin out and carried them laid full length across two planks, with two men staggering at the end of each plank, to the fish house where they waited for the ice truck to carry them to the market in Havana. Those who had caught sharks had taken them to the shark factory on the other side of the cove where they were hoisted on a block and tackle, their livers removed, their fins cut off and their hides skinned out and their flesh cut into strips for salting.
            </p>
            <p> When the wind was in the east a smell came across the harbour from the shark factory; but today there was only the faint edge of the odour because the wind had backed into the north and then dropped off and it was pleasant and sunny on the Terrace.
            </p>
            <p> “Santiago,” the boy said. </p>
            <p> “Yes,” the old man said. He was holding his glass and thinking of many years ago. </p>
            <p> “Can I go out to get sardines for you for tomorrow?” </p>
            <p> “No. Go and play baseball. I can still row and Rogelio will throw the net.” </p>
            <p> “I would like to go. If I cannot fish with you. I would like to serve in some way.” </p>
            <p>“You bought me a beer,” the old man said. “You are already a man.”</p>
            <p> “How old was I when you first took me in a boat?” </p>
            <p> “Five and you nearly were killed when I brought the fish in too green and he nearly tore the boat to pieces. Can you remember?”
            </p>
            <p>“I can remember the tail slapping and banging and the thwart breaking and the noise of the clubbing. I can remember you throwing me into the bow where the wet coiled lines were and feeling the whole boat shiver and the noise of you clubbing him like chopping a tree down and the sweet blood smell all over me.”
            </p>
          </section>
        </main>
        <Footer/>
        <Style rules={theme}/>
      </div>
    )
  }
}

export default Docs;

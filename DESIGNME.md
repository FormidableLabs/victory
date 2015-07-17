### Proto-Readme

I had a long talk with Colin the other night, and agreed to take a few notes to
start shaping in to a proper `README`. They are here, for your delectation,
review, and commentary:

#### D3 Over Time

**Step One**

1.  We are reclaiming SVG as markup
2.  We are making looping over data explicit
    1. We are doing away with `enter`
3.  Do away with d3's entire dom model
    We couldn't do this with jQuery; now we have React.

**Step Two**

1.  Everybody loves to copy paste
    When you start with d3, you get a long-ass list of scatter plots and you copy
    paste one and pray it works.
2.  Functionality is locked up in bl.ocks and gists -- wrong. Gists aren't the
    right format for code of this kind.
3.  With d3-as-it-has-been, functionality is not componentized. 
4.  So we'll make: components as discrete, manageable, configurable pieces
5.  There are a lot of other charting libraries out there; this one is
    different, especially if you're doing this from the beginning
6.  Sensible defaults


### Design / Welcome to the Neighborhood Questions

**Preface**: This is not my first rodeo; it's not even really my first
  JavaScript Rodeo, really. But: I'm a server-dweller. I work a lot in compiled
  languages, with a heavy dose of Python. Some of these thoughts and questions
  might be pretty far on the n00b end of the spectrum. Learn me a thing. I can
  keep up.


#### Question One: Composition

How granular do we hope to get with the composed nature of `react`? I've worked
with `react` some; I use composition-the-programming-technique a freaking
lot. When somebody says, "let's use `react` to replace `d3`'s hideous DOM
model", what I think of is a heirarchy a little like:

```
module: chart
constituent modules:
- line
- grid (made of line again)
- point (made of a shape and an optional label)
- legend
```

But now we're getting in to the business of using `react` to replace `d3`'s
logic, instead of just it's math. Another, maybe/probably better way to do this
would look more like going down Michael Bostock's npm profile page and making
one `victory`  module for every `d3` module. Chart, then, would just be:

```
module: chart
```

I'm kinda hoping we're planning on the second one. Y'all?

This also feeds in to the next question.

#### Question Two: The Thousand Modules Problem

This has been on my mind a lot since coming aboard to pitch in with
`victory`. Let's see if I can articulate this well, but briefly.

In server-side languages land, I might compile a Java jar and it might be 43
megabytes and I might laugh at how small that is. The compiled code that runs my
web site is something over two hundred meg. Chatting with Colin the other night,
he said very emphatically, "you know, most people are pulling in all of d3 just
to use one little thing and it's saddling them with like, 150k of
dependencies. 150k! Of stuff they aren't using!"

So that was eye-opening. The world of terabyte-scale data transformation is a
little different than the world of browsers.

But, now we have two different things to consider: maintainability verses, for
lack of a better phrase, small modules. We could make a single `victory` repo
containing every `victory` component. You'd use the whole blob, and it'd be `d3`
wearing a heavy coat. We could make a one-to-one correspondence, `d3` module ->
`victory` module. They could all be teeny tiny.

...and also, potentially, a _mess_ to maintain well. Bostock's got 69 modules on
NPM. Let's say only sixty of those are `d3`. That's sixty places to change
boilerplate. Updating to the latest version of `react`? That's sixty
deploys. If some of our modules depend on one another, this could mean a fresh
new dependency hell for people who use a lot of them (probably us). Maybe
`chart` uses the latest version of `line`, but `tree` uses an older one, and
you'd like both on the same page.

Anyways.

In server-land, we'd rely on the build system to try and keep us from fucking
ourselves too badly. Approaches vary, from compiler plugins that scour your
dependency tree to Twitter's new build system, `pants`, which assumes all code
in a single repo and takes slices across to assemble finished packages.

Point is: what do y'all have in mind?

#### Question Three: Data and Audience

This is an API design question: are we assuming that all data fed in to
`victory` will already be in the format expected by `d3`, or are we planning on
munging data ourselves? Put another way: who are we making `victory` _for_, and
how much do we expect them to know about `d3` itself? 



import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { RosbridgeContext } from "../../providers/RosBridge";

type TreeToRender = {
  tree: any;
};

let canvas_graph: any = null;
let canvas_paper: any = null;
let timeline_graph: any = null;
let timeline_paper: any = null;

function Home() {
  const { message } = useContext(RosbridgeContext);
  const canvasRef = useRef(null);
  // @ts-ignore
  // py_trees.hello();

  const render_tree = useCallback(
    ({ tree }: TreeToRender) => {
      // if there is no timeline
      /*
      var graph_changed = py_trees.canvas.update_graph({graph: canvas_graph, tree: tree})
      if ( graph_changed ) {
          py_trees.canvas.layout_graph({graph: canvas_graph})
          if ( canvas_graph.get('scale_content_to_fit') ) {
              py_trees.canvas.scale_content_to_fit(canvas_paper)
          }
      }
      */

      // console.log("render_tree tree", tree);
      // @ts-ignore
      py_trees.timeline.add_tree_to_cache({
        timeline_graph: timeline_graph,
        canvas_graph: canvas_graph,
        canvas_paper: canvas_paper,
        tree: tree,
      });
      return "rendered";
    },
    [canvasRef]
  );

  useEffect(() => {
    if (!message) return;
    console.log("message", message);
    const data = JSON.parse(message);
    if (data && data.activity && data.activity[0]) {
      data.activity[0] = data.activity[0].replaceAll("[doubleQuote]", '"');
    }
    const tree = { tree: data };
    console.log("tree", tree);
    render_tree(tree);
  }, [message, render_tree]);

  // useEffect(() => {
  //   if (treeState === 1) {
  //     setTree(mockedTree);
  //   }
  //   if (treeState === 2) {
  //     setTree(demoTree);
  //   }
  //   setTimeout(() => {
  //     setTreeState(treeState === 1 ? 2 : 1);
  //   }, 3000);
  // }, [treeState, setTreeState]);

  useLayoutEffect(() => {
    function updateSize() {
      console.log("updateSize");
      if (!canvas_paper || !timeline_paper) return;
      // @ts-ignore
      py_trees.canvas.on_window_resize(canvas_paper);
      // @ts-ignore
      py_trees.timeline.on_window_resize(timeline_paper);
      // render_tree(mockedTree);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log("canvas", canvas);

    // @ts-ignore
    canvas_graph = py_trees.canvas.create_graph();
    // @ts-ignore
    canvas_paper = py_trees.canvas.create_paper({
      graph: canvas_graph,
    });

    // event timeline
    // @ts-ignore
    timeline_graph = py_trees.timeline.create_graph({
      event_cache_limit: 100,
    });
    // @ts-ignore
    timeline_paper = py_trees.timeline.create_paper({
      timeline_graph: timeline_graph,
      canvas_graph: canvas_graph,
      canvas_paper: canvas_paper,
    });
  }, []);

  // react to window resizing events
  // $(window).resize(function() {
  // })
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="canvas" ref={canvasRef}></div>
      <div id="timeline"></div>
    </div>
  );
}

export default Home;

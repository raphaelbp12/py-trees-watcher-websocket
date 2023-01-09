import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

type TreeToRender = {
  tree: any;
};

// @ts-ignore
const demoTree: TreeToRender = {
  tree: {
    timestamp: 1563938995,
    visited_path: ["1", "2", "3", "4", "5", "7", "8"],
    behaviours: {
      "1": {
        id: "1",
        status: "RUNNING",
        name: "Selector",
        colour: "#00FFFF",
        children: ["2", "3", "4", "6"],
        data: {
          Type: "py_trees.composites.Selector",
          Feedback: "Decision maker",
        },
      },
      "2": {
        id: "2",
        status: "FAILURE",
        name: "Sequence",
        colour: "#FFA500",
        children: ["7", "8", "9"],
        data: {
          Type: "py_trees.composites.Sequence",
          Feedback: "Worker",
        },
      },
      "3": {
        id: "3",
        status: "FAILURE",
        name: "Parallel",
        details: "SuccessOnOne",
        colour: "#FFFF00",
        data: {
          Type: "py_trees.composites.Parallel",
          Feedback: "Baked beans is good for your heart, baked beans makes you",
        },
      },
      "4": {
        id: "4",
        status: "RUNNING",
        name: "&#x302; &#x302; Decorator",
        colour: "#DDDDDD",
        children: ["5"],
        data: {
          Type: "py_trees.composites.Decorator",
          Feedback: "Wearing the hats",
        },
      },
      "5": {
        id: "5",
        status: "RUNNING",
        name: "Decorated Beyond The Beliefs of an Agnostic Rhino",
        colour: "#555555",
        data: {
          Type: "py_trees.composites.Behaviour",
          Feedback: "....",
        },
      },
      "6": {
        id: "6",
        status: "INVALID",
        name: "Behaviour",
        colour: "#555555",
        data: {
          Type: "py_trees.composites.Behaviour",
          Feedback: "...",
        },
      },
      "7": {
        id: "7",
        status: "SUCCESS",
        name: "Worker A",
        colour: "#555555",
        data: {
          Type: "py_trees.composites.Behaviour",
          Feedback: "...",
        },
      },
      "8": {
        id: "8",
        status: "FAILURE",
        name: "Worker B",
        colour: "#555555",
        data: {
          Type: "py_trees.composites.Behaviour",
          Feedback: "...",
        },
      },
      "9": {
        id: "9",
        status: "INVALID",
        name: "Worker C",
        colour: "#555555",
        data: {
          Type: "py_trees.composites.Behaviour",
          Feedback: "...",
        },
      },
    },
  },
};

const mockedTree: TreeToRender = {
  tree: {
    changed: "false",
    timestamp: 1673261694.65297,
    behaviours: {
      "4ad59327-2e78-4b58-82cb-6bf9fe87e9d7": {
        id: "4ad59327-2e78-4b58-82cb-6bf9fe87e9d7",
        status: "RUNNING",
        name: "HealthListener",
        colour: "#555555",
        details: "",
        children: [],
        data: {
          Class: "communication.health_listener.HealthListener",
          Feedback: "",
        },
      },
      "800846b1-36f2-47df-80f1-0382d3074507": {
        id: "800846b1-36f2-47df-80f1-0382d3074507",
        status: "RUNNING",
        name: "HealthSequence",
        colour: "#FFFF00",
        details: "OnAll",
        children: ["4ad59327-2e78-4b58-82cb-6bf9fe87e9d7"],
        data: { Class: "py_trees.composites.Parallel", Feedback: "" },
      },
      "de7d060c-e0bb-4197-9d78-26c89205f30c": {
        id: "de7d060c-e0bb-4197-9d78-26c89205f30c",
        status: "INVALID",
        name: "Error",
        colour: "#555555",
        details: "",
        children: [],
        data: { Class: "behaviors.base_behaviors.error.Error", Feedback: "" },
      },
      "e22ac416-79e8-4503-948c-b3b2abdf24ba": {
        id: "e22ac416-79e8-4503-948c-b3b2abdf24ba",
        status: "FAILURE",
        name: "RunningIsFailure",
        colour: "#DDDDDD",
        details: "",
        children: ["de7d060c-e0bb-4197-9d78-26c89205f30c"],
        data: {
          Class: "py_trees.decorators.RunningIsFailure",
          Feedback: "running is failure",
        },
      },
      "0108f912-1884-469f-a9c8-1e2b25863a7b": {
        id: "0108f912-1884-469f-a9c8-1e2b25863a7b",
        status: "INVALID",
        name: "Emergency",
        colour: "#555555",
        details: "",
        children: [],
        data: {
          Class:
            "robot_behavior2.behaviors.interrupt_behaviors.emergency.Emergency",
          Feedback: "",
        },
      },
      "667f2a5a-511c-40d9-9430-62bfe233dbd8": {
        id: "667f2a5a-511c-40d9-9430-62bfe233dbd8",
        status: "INVALID",
        name: "Emergency",
        colour: "#FFA500",
        details: "WithMemory",
        children: ["0108f912-1884-469f-a9c8-1e2b25863a7b"],
        data: { Class: "py_trees.composites.Sequence", Feedback: "" },
      },
      "daa6295b-478e-46fe-a8df-8aefe276ff42": {
        id: "daa6295b-478e-46fe-a8df-8aefe276ff42",
        status: "FAILURE",
        name: "emergency",
        colour: "#DDDDDD",
        details: "",
        children: ["667f2a5a-511c-40d9-9430-62bfe233dbd8"],
        data: {
          Class: "py_trees.decorators.EternalGuard",
          Feedback: "",
          Blackboard: ["/emergency_state (r)"],
        },
      },
      "a7adf98e-c9aa-4bd6-ac3a-35f8c2e6631b": {
        id: "a7adf98e-c9aa-4bd6-ac3a-35f8c2e6631b",
        status: "INVALID",
        name: "Teleop",
        colour: "#555555",
        details: "",
        children: [],
        data: { Class: "behaviors.base_behaviors.teleop.Teleop", Feedback: "" },
      },
      "f329e382-c43b-4188-b485-da8dba5d7b28": {
        id: "f329e382-c43b-4188-b485-da8dba5d7b28",
        status: "INVALID",
        name: "Teleop",
        colour: "#FFA500",
        details: "WithMemory",
        children: ["a7adf98e-c9aa-4bd6-ac3a-35f8c2e6631b"],
        data: { Class: "py_trees.composites.Sequence", Feedback: "" },
      },
      "f64a0019-d0ed-4980-a59d-e0392a366206": {
        id: "f64a0019-d0ed-4980-a59d-e0392a366206",
        status: "FAILURE",
        name: "teleop",
        colour: "#DDDDDD",
        details: "",
        children: ["f329e382-c43b-4188-b485-da8dba5d7b28"],
        data: {
          Class: "py_trees.decorators.EternalGuard",
          Feedback: "",
          Blackboard: ["/teleop_state (r)"],
        },
      },
      "5e295e44-a85a-4c54-9b31-89ad816c75e0": {
        id: "5e295e44-a85a-4c54-9b31-89ad816c75e0",
        status: "INVALID",
        name: "find_charge_location",
        colour: "#555555",
        details: "",
        children: [],
        data: {
          Class:
            "robot_behavior2.behaviors.base_behaviors.check_location.FindLocation",
          Feedback: "",
        },
      },
      "a4975ac0-9893-4ef9-b78b-0caeee6733a3": {
        id: "a4975ac0-9893-4ef9-b78b-0caeee6733a3",
        status: "INVALID",
        name: "goto_charge",
        colour: "#555555",
        details: "",
        children: [],
        data: {
          Class: "robot_behavior2.behaviors.base_behaviors.go_to.GoTo",
          Feedback: "",
        },
      },
      "6041b3ae-967e-4012-a9de-28cdd6351e11": {
        id: "6041b3ae-967e-4012-a9de-28cdd6351e11",
        status: "INVALID",
        name: "Charge",
        colour: "#555555",
        details: "",
        children: [],
        data: {
          Class: "robot_behavior2.behaviors.interrupt_behaviors.charge.Charge",
          Feedback: "",
        },
      },
      "1029e6da-d66a-4156-82e8-600c534b242c": {
        id: "1029e6da-d66a-4156-82e8-600c534b242c",
        status: "INVALID",
        name: "Charge",
        colour: "#FFA500",
        details: "WithMemory",
        children: [
          "5e295e44-a85a-4c54-9b31-89ad816c75e0",
          "a4975ac0-9893-4ef9-b78b-0caeee6733a3",
          "6041b3ae-967e-4012-a9de-28cdd6351e11",
        ],
        data: { Class: "py_trees.composites.Sequence", Feedback: "" },
      },
      "f999b9cb-da24-40af-a057-e3c705a9b62f": {
        id: "f999b9cb-da24-40af-a057-e3c705a9b62f",
        status: "FAILURE",
        name: "charge",
        colour: "#DDDDDD",
        details: "",
        children: ["1029e6da-d66a-4156-82e8-600c534b242c"],
        data: {
          Class: "py_trees.decorators.EternalGuard",
          Feedback: "",
          Blackboard: ["/charge_state (r)"],
        },
      },
      "dcec86a1-ba05-414b-b12f-967e2c47d6cf": {
        id: "dcec86a1-ba05-414b-b12f-967e2c47d6cf",
        status: "FAILURE",
        name: "nc_interruptions",
        colour: "#00FFFF",
        details: "",
        children: [
          "f64a0019-d0ed-4980-a59d-e0392a366206",
          "f999b9cb-da24-40af-a057-e3c705a9b62f",
        ],
        data: { Class: "py_trees.composites.Selector", Feedback: "" },
      },
      "312d841a-852c-4b48-94d2-f378138cb0a6": {
        id: "312d841a-852c-4b48-94d2-f378138cb0a6",
        status: "RUNNING",
        name: "idle",
        colour: "#555555",
        details: "",
        children: [],
        data: { Class: "behaviors.base_behaviors.idle.Idle", Feedback: "" },
      },
      "64aada3a-0ca5-4ba0-a87e-eecb6db1a6bb": {
        id: "64aada3a-0ca5-4ba0-a87e-eecb6db1a6bb",
        status: "RUNNING",
        name: "Tasks",
        colour: "#00FFFF",
        details: "",
        children: [
          "daa6295b-478e-46fe-a8df-8aefe276ff42",
          "dcec86a1-ba05-414b-b12f-967e2c47d6cf",
          "312d841a-852c-4b48-94d2-f378138cb0a6",
        ],
        data: { Class: "py_trees.composites.Selector", Feedback: "" },
      },
      "ac804fa7-fde8-45a0-9e55-235c0d3f25c7": {
        id: "ac804fa7-fde8-45a0-9e55-235c0d3f25c7",
        status: "RUNNING",
        name: "Manager",
        colour: "#00FFFF",
        details: "",
        children: [
          "e22ac416-79e8-4503-948c-b3b2abdf24ba",
          "64aada3a-0ca5-4ba0-a87e-eecb6db1a6bb",
        ],
        data: { Class: "py_trees.composites.Selector", Feedback: "" },
      },
      "4eb46494-469a-4e2b-9995-41e35544a748": {
        id: "4eb46494-469a-4e2b-9995-41e35544a748",
        status: "RUNNING",
        name: "lewis",
        colour: "#FFFF00",
        details: "OnAll",
        children: [
          "800846b1-36f2-47df-80f1-0382d3074507",
          "ac804fa7-fde8-45a0-9e55-235c0d3f25c7",
        ],
        data: { Class: "py_trees.composites.Parallel", Feedback: "" },
      },
    },
    blackboard: {
      behaviours: {
        "daa6295b-478e-46fe-a8df-8aefe276ff42": { "/emergency_state": "r" },
        "f64a0019-d0ed-4980-a59d-e0392a366206": { "/teleop_state": "r" },
        "f999b9cb-da24-40af-a057-e3c705a9b62f": { "/charge_state": "r" },
      },
      data: {
        behaviours: {},
        data: {},
        "/charge_state": "False",
        "/emergency_state": "False",
        "/teleop_state": "False",
      },
    },
    visited_path: [
      "4ad59327-2e78-4b58-82cb-6bf9fe87e9d7",
      "800846b1-36f2-47df-80f1-0382d3074507",
      "de7d060c-e0bb-4197-9d78-26c89205f30c",
      "e22ac416-79e8-4503-948c-b3b2abdf24ba",
      "daa6295b-478e-46fe-a8df-8aefe276ff42",
      "f64a0019-d0ed-4980-a59d-e0392a366206",
      "f999b9cb-da24-40af-a057-e3c705a9b62f",
      "dcec86a1-ba05-414b-b12f-967e2c47d6cf",
      "312d841a-852c-4b48-94d2-f378138cb0a6",
      "64aada3a-0ca5-4ba0-a87e-eecb6db1a6bb",
      "ac804fa7-fde8-45a0-9e55-235c0d3f25c7",
      "4eb46494-469a-4e2b-9995-41e35544a748",
    ],
    activity: [
      "<table><tr><td><text style=\"color:cyan;\">/emergency_state</text></td><td style='text-align: center;'><text style=\"color:darkgoldenrod;\">READ</text></td><td style='text-align: center;'><text>emergency</text></td><td><text><text>&#x2190;</text><text>&#xa0;</text>False</text></td></tr><tr><td><text style=\"color:cyan;\">/teleop_state</text></td><td style='text-align: center;'><text style=\"color:darkgoldenrod;\">READ</text></td><td style='text-align: center;'><text>teleop</text></td><td><text><text>&#x2190;</text><text>&#xa0;</text>False</text></td></tr><tr><td><text style=\"color:cyan;\">/charge_state</text></td><td style='text-align: center;'><text style=\"color:darkgoldenrod;\">READ</text></td><td style='text-align: center;'><text>charge</text></td><td><text><text>&#x2190;</text><text>&#xa0;</text>False</text></td></tr></table>",
    ],
  },
};

let canvas_graph: any = null;
let canvas_paper: any = null;
let timeline_graph: any = null;
let timeline_paper: any = null;

function App() {
  const [tree, setTree] = useState<any>();
  const [treeState, setTreeState] = useState<number>(1);
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
    if (treeState === 1) {
      setTree(mockedTree);
    }
    if (treeState === 2) {
      setTree(demoTree);
    }
    setTimeout(() => {
      setTreeState(treeState === 1 ? 2 : 1);
    }, 3000);
  }, [treeState, setTreeState]);

  useEffect(() => {
    if (tree) {
      render_tree(tree);
    }
  }, [tree, setTree, render_tree]);

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
    <div className="App">
      <div id="canvas" ref={canvasRef}></div>
      <div id="timeline"></div>
    </div>
  );
}

export default App;

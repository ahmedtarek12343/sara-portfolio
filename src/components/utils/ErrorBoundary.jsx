import { Component } from "react";

// Guards fragile, isolated pieces of the UI (WebGL/physics content in
// particular) so a failure there — a lost GPU context, an unsupported
// browser, a bad texture load — can't take the rest of the page down with
// it. Without this, an uncaught render error anywhere in the tree unmounts
// the entire app to a blank white screen, since nothing else catches it.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

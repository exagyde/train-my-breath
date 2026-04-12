"use client";

const STYLE = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "30px 0",
    textAlign: "center"
};

export default function Footer() {
    return (
        <footer style={STYLE}>
            <small>©2026 Train My Breath<br />Respirez mieux, performez plus.</small>
        </footer>
    );
}
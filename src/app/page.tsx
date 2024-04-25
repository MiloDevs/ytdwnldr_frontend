"use client";
import { LucideArrowDown } from "lucide-react";
import axios from "axios";
import openSocket from "socket.io-client";
import React, { Component } from "react";
import { create } from "domain";
import { saveAs } from "file-saver";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/";
const socket = openSocket(API_URL);

interface State {
  url: string;
  tooltip: string;
  downloadUrl: string;
  loaded: string;
  progress: string;
  remainder: string;
  videoName: string;
  videoUploader: string;
  isDownloading: boolean;
  clientId: string;
}

export default class Home extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      clientId: "",
      url: "",
      tooltip: "",
      downloadUrl: "",
      loaded: "",
      progress: "",
      remainder: "",
      videoName: "",
      videoUploader: "",
      isDownloading: false,
    };
  }

  componentDidMount() {
    socket.on("progress", (data) => {
      this.setState({ progress: data });
    });

    socket.on("downloadCompletedClient", (data) => {
      console.log(data);
      this.setState({ remainder: data });
      this.setState({ isDownloading: false });
    });

    socket.on("audioDetails", (data) => {
      console.log(data);
      this.setState({ videoName: data.title });
      this.setState({ videoUploader: data.author });
    });

    socket.on("clientId", (id) => {
      this.setState({ clientId: id });
      // Now you can use the client ID for future requests
    });
  }

  handleInputChange = (e: any) => {
    this.setState({ url: e.target.value });
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!this.state.url) {
      this.setState({ tooltip: "Please enter a valid YouTube URL" });
      return;
    }

    this.setState({ tooltip: "" });
    this.setState({ loaded: "" });
    this.setState({ progress: "" });
    this.setState({ remainder: "" });
    this.setState({ videoName: "" });
    this.setState({ videoUploader: "" });
    this.setState({ isDownloading: true });

    try {
      const res = await axios
        .post(
          `${API_URL}`,
          {
            url: this.state.url,
            clientId: this.state.clientId,
          },
          {
            method: "POST",
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
              this.setState({ loaded: progressEvent.loaded.toString() });
            },

          }
        )
        .then((response) => {
          // download the file as mp3
          this.downloadFile(response.data, `${this.state.videoName}.mp3`);  
        });
    } catch (err) {
      console.log(err);
      this.setState({ isDownloading: false });
      this.setState({ tooltip: "An error occurred. Please try again." });
    }
  };

  downloadFile = (blob: Blob, fileName: string) => {
    saveAs(blob, fileName);
  }

  render() {
    return (
      <main className="flex flex-col min-h-screen p-4 bg-dot-white/[0.2] dark:bg-dot-white/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <nav className="flex w-full items-center z-10 justify-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-b from-black flex items-center justify-center to-neutral-900 border rounded-xl border-neutral-800">
              <LucideArrowDown className="text-white" />
            </div>
            <h1 className="md:text-2xl font-bold text-white">YTDwnldr</h1>
          </div>
        </nav>
        <section className="flex flex-col items-center justify-center flex-1">
          <div className="flex flex-col items-center justify-center">
            <h2 className="md:text-3xl max-w-full md:max-w-lg z-20 font-bold text-white mt-4 text-center">
              No ads, no tracking, no BS. Just YouTube videos in MP4 & MP3
              format.
            </h2>
            <form className="w-full" onSubmit={this.handleSubmit}>
              <div className="mt-12 relative">
                {this.state.tooltip && (
                  <p className="text-white text-sm font-medium text-center absolute -top-full bg-neutral-900 border border-neutral-800  px-2 py-1 rounded-md">
                    {this.state.tooltip}
                  </p>
                )}
                <input
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-2 rounded-md"
                  placeholder="Enter a YouTube video URL"
                  value={this.state.url}
                  disabled={this.state.isDownloading}
                  name="url"
                  onChange={this.handleInputChange}
                  type="url"
                />
              </div>
              <button
                type="submit"
                disabled={this.state.isDownloading}
                className="bg-gradient-to-r overflow-clip relative mt-6 from-black-700 via-neutral-800 w-full z-10 focus:outline focus:outline-offset-1 to-neutral-900 text-white px-4 py-2 border border-neutral-700 rounded-md"
              >
                <p className="z-20 relative">
                  {this.state.isDownloading
                    ? `Downloading... ${Number(this.state.progress).toFixed(
                        2
                      )}%`
                    : "Download"}
                </p>
                <div
                  style={{
                    width: this.state.isDownloading
                      ? `${Number(this.state.progress).toFixed(2)}%`
                      : "0%",
                  }}
                  className={`absolute inset-0 z-10 h-full bg-neutral-900 animate-pulse transition-all ease-in-out`}
                ></div>
              </button>
            </form>
          </div>
        </section>
        <footer className="flex items-center justify-center w-full fixed bottom-2">
          <p className="text-white text-sm">
            Made with ❤️ by milodevs
          </p>
        </footer>
      </main>
    );
  }
}

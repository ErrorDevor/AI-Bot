import React, { SVGProps, useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundAnimation: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path");
    if (!paths) return;

    gsap.set(paths, {
      scaleY: 0,
      transformOrigin: "center bottom",
      opacity: 0,
    });

    gsap.to(paths, {
      scaleY: 1,
      opacity: 1,
      duration: 0.6,
      delay: 1,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, []);
  return (
    <svg
      ref={svgRef}
      {...props}
      viewBox="0 0 916 323"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject x="166.373" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_0_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>

      <g
        filter="url(#filter0_i_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <path
          d="M220.042 32.2012C223.006 32.2012 225.409 29.7984 225.409 26.8344V5.36687C225.409 2.40283 223.006 0 220.042 0H198.574C195.61 0 193.207 2.40283 193.207 5.36687V26.8344C193.207 29.7984 195.61 32.2012 198.574 32.2012H220.042Z"
          fill="#97C3FF"
          fill-opacity="0.2"
        />
        <g
          clip-path="url(#paint0_diamond_4022_71387_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(-0.0198993 0 0 0.0198993 209.308 16.1006)">
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              fill="url(#paint0_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(1 -1)"
              fill="url(#paint0_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1 1)"
              fill="url(#paint0_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1)"
              fill="url(#paint0_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
          </g>
        </g>
        <path
          d="M220.042 32.2012C223.006 32.2012 225.409 29.7984 225.409 26.8344V5.36687C225.409 2.40283 223.006 0 220.042 0H198.574C195.61 0 193.207 2.40283 193.207 5.36687V26.8344C193.207 29.7984 195.61 32.2012 198.574 32.2012H220.042Z"
          data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:229.20741271972656,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.50,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
        />
        <path
          d="M220.042 32.2012C223.006 32.2012 225.409 29.7984 225.409 26.8344V5.36687C225.409 2.40283 223.006 0 220.042 0H198.574C195.61 0 193.207 2.40283 193.207 5.36687V26.8344C193.207 29.7984 195.61 32.2012 198.574 32.2012H220.042Z"
          fill="url(#paint1_linear_4022_71387)"
          fill-opacity="0.4"
        />
      </g>
      <foreignObject x="134.172" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_1_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <g
        filter="url(#filter1_i_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <path
          d="M187.841 32.2012C190.805 32.2012 193.208 29.7984 193.208 26.8344V5.36687C193.208 2.40283 190.805 0 187.841 0H166.373C163.409 0 161.006 2.40283 161.006 5.36687V26.8344C161.006 29.7984 163.409 32.2012 166.373 32.2012H187.841Z"
          fill="#97C3FF"
          fill-opacity="0.2"
        />
        <g
          clip-path="url(#paint2_diamond_4022_71387_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(-0.0198993 0 0 0.0198993 177.107 16.1006)">
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              fill="url(#paint2_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(1 -1)"
              fill="url(#paint2_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1 1)"
              fill="url(#paint2_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1)"
              fill="url(#paint2_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
          </g>
        </g>
        <path
          d="M187.841 32.2012C190.805 32.2012 193.208 29.7984 193.208 26.8344V5.36687C193.208 2.40283 190.805 0 187.841 0H166.373C163.409 0 161.006 2.40283 161.006 5.36687V26.8344C161.006 29.7984 163.409 32.2012 166.373 32.2012H187.841Z"
          data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:197.00624084472656,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.50,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
        />
        <path
          d="M187.841 32.2012C190.805 32.2012 193.208 29.7984 193.208 26.8344V5.36687C193.208 2.40283 190.805 0 187.841 0H166.373C163.409 0 161.006 2.40283 161.006 5.36687V26.8344C161.006 29.7984 163.409 32.2012 166.373 32.2012H187.841Z"
          fill="url(#paint3_linear_4022_71387)"
          fill-opacity="0.4"
        />
      </g>
      <foreignObject x="101.971" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_3_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <g
        filter="url(#filter2_i_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <g clip-path="url(#clip2_4022_71387)">
          <path
            d="M155.639 32.2012C158.604 32.2012 161.006 29.7984 161.006 26.8344V5.36687C161.006 2.40283 158.604 0 155.639 0H134.172C131.208 0 128.805 2.40283 128.805 5.36687V26.8344C128.805 29.7984 131.208 32.2012 134.172 32.2012H155.639Z"
            fill="#97C3FF"
            fill-opacity="0.2"
          />
          <g
            clip-path="url(#paint4_diamond_4022_71387_clip_path)"
            data-figma-skip-parse="true"
          >
            <g transform="matrix(-0.0198993 0 0 0.0198993 144.906 16.1006)">
              <rect
                x="0"
                y="0"
                width="876.528"
                height="876.528"
                fill="url(#paint4_diamond_4022_71387)"
                opacity="0.5"
                shape-rendering="crispEdges"
              />
              <rect
                x="0"
                y="0"
                width="876.528"
                height="876.528"
                transform="scale(1 -1)"
                fill="url(#paint4_diamond_4022_71387)"
                opacity="0.5"
                shape-rendering="crispEdges"
              />
              <rect
                x="0"
                y="0"
                width="876.528"
                height="876.528"
                transform="scale(-1 1)"
                fill="url(#paint4_diamond_4022_71387)"
                opacity="0.5"
                shape-rendering="crispEdges"
              />
              <rect
                x="0"
                y="0"
                width="876.528"
                height="876.528"
                transform="scale(-1)"
                fill="url(#paint4_diamond_4022_71387)"
                opacity="0.5"
                shape-rendering="crispEdges"
              />
            </g>
          </g>
          <path
            d="M155.639 32.2012C158.604 32.2012 161.006 29.7984 161.006 26.8344V5.36687C161.006 2.40283 158.604 0 155.639 0H134.172C131.208 0 128.805 2.40283 128.805 5.36687V26.8344C128.805 29.7984 131.208 32.2012 134.172 32.2012H155.639Z"
            data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:164.80506896972656,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.50,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
          />
          <path
            d="M155.639 32.2012C158.604 32.2012 161.006 29.7984 161.006 26.8344V5.36687C161.006 2.40283 158.604 0 155.639 0H134.172C131.208 0 128.805 2.40283 128.805 5.36687V26.8344C128.805 29.7984 131.208 32.2012 134.172 32.2012H155.639Z"
            fill="url(#paint5_linear_4022_71387)"
            fill-opacity="0.4"
          />
          <g
            style={{ mixBlendMode: "plus-lighter" }}
            filter="url(#filter3_f_4022_71387)"
          >
            <ellipse
              cx="148.622"
              cy="24.3653"
              rx="19.5"
              ry="8.5"
              fill="#BBFFFF"
              fillOpacity="0.5"
            />
          </g>
        </g>
      </g>
      <foreignObject x="69.7696" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_4_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <g
        filter="url(#filter4_i_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <path
          d="M123.438 32.2012C126.402 32.2012 128.805 29.7984 128.805 26.8344V5.36687C128.805 2.40283 126.402 0 123.438 0H101.971C99.0068 0 96.6039 2.40283 96.6039 5.36687V26.8344C96.6039 29.7984 99.0068 32.2012 101.971 32.2012H123.438Z"
          fill="#97C3FF"
          fill-opacity="0.2"
        />
        <g
          clip-path="url(#paint6_diamond_4022_71387_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(-0.0198993 0 0 0.0198993 112.705 16.1006)">
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              fill="url(#paint6_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(1 -1)"
              fill="url(#paint6_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1 1)"
              fill="url(#paint6_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1)"
              fill="url(#paint6_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
          </g>
        </g>
        <path
          d="M123.438 32.2012C126.402 32.2012 128.805 29.7984 128.805 26.8344V5.36687C128.805 2.40283 126.402 0 123.438 0H101.971C99.0068 0 96.6039 2.40283 96.6039 5.36687V26.8344C96.6039 29.7984 99.0068 32.2012 101.971 32.2012H123.438Z"
          data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:132.60389709472656,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.50,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
        />
        <path
          d="M123.438 32.2012C126.402 32.2012 128.805 29.7984 128.805 26.8344V5.36687C128.805 2.40283 126.402 0 123.438 0H101.971C99.0068 0 96.6039 2.40283 96.6039 5.36687V26.8344C96.6039 29.7984 99.0068 32.2012 101.971 32.2012H123.438Z"
          fill="url(#paint7_linear_4022_71387)"
          fill-opacity="0.4"
        />
      </g>
      <foreignObject x="37.5685" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_5_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <g
        filter="url(#filter5_i_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <path
          d="M91.2371 32.2012C94.2012 32.2012 96.604 29.7984 96.604 26.8344V5.36687C96.604 2.40283 94.2012 0 91.2371 0H69.7696C66.8056 0 64.4028 2.40283 64.4028 5.36687V26.8344C64.4028 29.7984 66.8056 32.2012 69.7696 32.2012H91.2371Z"
          fill="#97C3FF"
          fill-opacity="0.2"
        />
        <g
          clip-path="url(#paint8_diamond_4022_71387_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(-0.0198993 0 0 0.0198993 80.5034 16.1006)">
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              fill="url(#paint8_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(1 -1)"
              fill="url(#paint8_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1 1)"
              fill="url(#paint8_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1)"
              fill="url(#paint8_diamond_4022_71387)"
              opacity="0.5"
              shape-rendering="crispEdges"
            />
          </g>
        </g>
        <path
          d="M91.2371 32.2012C94.2012 32.2012 96.604 29.7984 96.604 26.8344V5.36687C96.604 2.40283 94.2012 0 91.2371 0H69.7696C66.8056 0 64.4028 2.40283 64.4028 5.36687V26.8344C64.4028 29.7984 66.8056 32.2012 69.7696 32.2012H91.2371Z"
          data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:100.40273284912109,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.50,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
        />
        <path
          d="M91.2371 32.2012C94.2012 32.2012 96.604 29.7984 96.604 26.8344V5.36687C96.604 2.40283 94.2012 0 91.2371 0H69.7696C66.8056 0 64.4028 2.40283 64.4028 5.36687V26.8344C64.4028 29.7984 66.8056 32.2012 69.7696 32.2012H91.2371Z"
          fill="url(#paint9_linear_4022_71387)"
          fill-opacity="0.4"
        />
      </g>
      <foreignObject x="5.36681" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_6_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <g
        filter="url(#filter6_ii_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <path
          d="M59.0355 32.2012C61.9995 32.2012 64.4023 29.7984 64.4023 26.8344V5.36687C64.4023 2.40283 61.9995 0 59.0355 0H37.568C34.6039 0 32.2011 2.40283 32.2011 5.36687V26.8344C32.2011 29.7984 34.6039 32.2012 37.568 32.2012H59.0355Z"
          fill="#E3EFFF"
          fill-opacity="0.2"
        />
        <g
          clip-path="url(#paint10_diamond_4022_71387_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(-0.0198993 0 0 0.0198993 48.3017 16.1006)">
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              fill="url(#paint10_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(1 -1)"
              fill="url(#paint10_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1 1)"
              fill="url(#paint10_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1)"
              fill="url(#paint10_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
          </g>
        </g>
        <path
          d="M59.0355 32.2012C61.9995 32.2012 64.4023 29.7984 64.4023 26.8344V5.36687C64.4023 2.40283 61.9995 0 59.0355 0H37.568C34.6039 0 32.2011 2.40283 32.2011 5.36687V26.8344C32.2011 29.7984 34.6039 32.2012 37.568 32.2012H59.0355Z"
          data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:68.201072692871094,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.40000000596046448,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
        />
      </g>
      <foreignObject x="-26.8344" y="-26.8343" width="85.8699" height="85.8699">
        <div
          style={{
            backdropFilter: "blur(13.42px)",
            clipPath: "url(#bgblur_7_4022_71387_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <g
        filter="url(#filter7_ii_4022_71387)"
        data-figma-bg-blur-radius="26.8344"
      >
        <rect
          width="32.2012"
          height="32.2012"
          rx="5.36687"
          transform="matrix(0 -1 -1 0 32.2012 32.2012)"
          fill="#E3EFFF"
          fill-opacity="0.2"
        />
        <g
          clip-path="url(#paint11_diamond_4022_71387_clip_path)"
          data-figma-skip-parse="true"
        >
          <g transform="matrix(-0.0198993 0 0 0.0198993 16.1006 16.1006)">
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              fill="url(#paint11_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(1 -1)"
              fill="url(#paint11_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1 1)"
              fill="url(#paint11_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="876.528"
              height="876.528"
              transform="scale(-1)"
              fill="url(#paint11_diamond_4022_71387)"
              opacity="0.4"
              shape-rendering="crispEdges"
            />
          </g>
        </g>
        <rect
          width="32.2012"
          height="32.2012"
          rx="5.36687"
          transform="matrix(0 -1 -1 0 32.2012 32.2012)"
          data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_DIAMOND&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-39.798686981201172,&#34;m01&#34;:6.1848448454707161e-13,&#34;m02&#34;:35.999900817871094,&#34;m10&#34;:-9.6526478758802992e-14,&#34;m11&#34;:39.798686981201172,&#34;m12&#34;:-3.7987294197082520},&#34;opacity&#34;:0.40000000596046448,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_4022_71387"
          x="166.373"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_0_4022_71387_clip_path"
          transform="translate(-166.373 26.8343)"
        >
          <path d="M220.042 32.2012C223.006 32.2012 225.409 29.7984 225.409 26.8344V5.36687C225.409 2.40283 223.006 0 220.042 0H198.574C195.61 0 193.207 2.40283 193.207 5.36687V26.8344C193.207 29.7984 195.61 32.2012 198.574 32.2012H220.042Z" />
        </clipPath>
        <clipPath id="paint0_diamond_4022_71387_clip_path">
          <path d="M220.042 32.2012C223.006 32.2012 225.409 29.7984 225.409 26.8344V5.36687C225.409 2.40283 223.006 0 220.042 0H198.574C195.61 0 193.207 2.40283 193.207 5.36687V26.8344C193.207 29.7984 195.61 32.2012 198.574 32.2012H220.042Z" />
        </clipPath>
        <filter
          id="filter1_i_4022_71387"
          x="134.172"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_1_4022_71387_clip_path"
          transform="translate(-134.172 26.8343)"
        >
          <path d="M187.841 32.2012C190.805 32.2012 193.208 29.7984 193.208 26.8344V5.36687C193.208 2.40283 190.805 0 187.841 0H166.373C163.409 0 161.006 2.40283 161.006 5.36687V26.8344C161.006 29.7984 163.409 32.2012 166.373 32.2012H187.841Z" />
        </clipPath>
        <clipPath id="paint2_diamond_4022_71387_clip_path">
          <path d="M187.841 32.2012C190.805 32.2012 193.208 29.7984 193.208 26.8344V5.36687C193.208 2.40283 190.805 0 187.841 0H166.373C163.409 0 161.006 2.40283 161.006 5.36687V26.8344C161.006 29.7984 163.409 32.2012 166.373 32.2012H187.841Z" />
        </clipPath>
        <filter
          id="filter2_i_4022_71387"
          x="101.971"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_3_4022_71387_clip_path"
          transform="translate(-101.971 26.8343)"
        >
          <path d="M155.639 32.2012C158.604 32.2012 161.006 29.7984 161.006 26.8344V5.36687C161.006 2.40283 158.604 0 155.639 0H134.172C131.208 0 128.805 2.40283 128.805 5.36687V26.8344C128.805 29.7984 131.208 32.2012 134.172 32.2012H155.639Z" />
        </clipPath>
        <clipPath id="paint4_diamond_4022_71387_clip_path">
          <path d="M155.639 32.2012C158.604 32.2012 161.006 29.7984 161.006 26.8344V5.36687C161.006 2.40283 158.604 0 155.639 0H134.172C131.208 0 128.805 2.40283 128.805 5.36687V26.8344C128.805 29.7984 131.208 32.2012 134.172 32.2012H155.639Z" />
        </clipPath>
        <filter
          id="filter3_f_4022_71387"
          x="99.1216"
          y="-14.1347"
          width="99"
          height="77"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="15"
            result="effect1_foregroundBlur_4022_71387"
          />
        </filter>
        <filter
          id="filter4_i_4022_71387"
          x="69.7696"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_4_4022_71387_clip_path"
          transform="translate(-69.7696 26.8343)"
        >
          <path d="M123.438 32.2012C126.402 32.2012 128.805 29.7984 128.805 26.8344V5.36687C128.805 2.40283 126.402 0 123.438 0H101.971C99.0068 0 96.6039 2.40283 96.6039 5.36687V26.8344C96.6039 29.7984 99.0068 32.2012 101.971 32.2012H123.438Z" />
        </clipPath>
        <clipPath id="paint6_diamond_4022_71387_clip_path">
          <path d="M123.438 32.2012C126.402 32.2012 128.805 29.7984 128.805 26.8344V5.36687C128.805 2.40283 126.402 0 123.438 0H101.971C99.0068 0 96.6039 2.40283 96.6039 5.36687V26.8344C96.6039 29.7984 99.0068 32.2012 101.971 32.2012H123.438Z" />
        </clipPath>
        <filter
          id="filter5_i_4022_71387"
          x="37.5685"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_5_4022_71387_clip_path"
          transform="translate(-37.5685 26.8343)"
        >
          <path d="M91.2371 32.2012C94.2012 32.2012 96.604 29.7984 96.604 26.8344V5.36687C96.604 2.40283 94.2012 0 91.2371 0H69.7696C66.8056 0 64.4028 2.40283 64.4028 5.36687V26.8344C64.4028 29.7984 66.8056 32.2012 69.7696 32.2012H91.2371Z" />
        </clipPath>
        <clipPath id="paint8_diamond_4022_71387_clip_path">
          <path d="M91.2371 32.2012C94.2012 32.2012 96.604 29.7984 96.604 26.8344V5.36687C96.604 2.40283 94.2012 0 91.2371 0H69.7696C66.8056 0 64.4028 2.40283 64.4028 5.36687V26.8344C64.4028 29.7984 66.8056 32.2012 69.7696 32.2012H91.2371Z" />
        </clipPath>
        <filter
          id="filter6_ii_4022_71387"
          x="5.36681"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-5.36687" />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_4022_71387"
            result="effect2_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_6_4022_71387_clip_path"
          transform="translate(-5.36681 26.8343)"
        >
          <path d="M59.0355 32.2012C61.9995 32.2012 64.4023 29.7984 64.4023 26.8344V5.36687C64.4023 2.40283 61.9995 0 59.0355 0H37.568C34.6039 0 32.2011 2.40283 32.2011 5.36687V26.8344C32.2011 29.7984 34.6039 32.2012 37.568 32.2012H59.0355Z" />
        </clipPath>
        <clipPath id="paint10_diamond_4022_71387_clip_path">
          <path d="M59.0355 32.2012C61.9995 32.2012 64.4023 29.7984 64.4023 26.8344V5.36687C64.4023 2.40283 61.9995 0 59.0355 0H37.568C34.6039 0 32.2011 2.40283 32.2011 5.36687V26.8344C32.2011 29.7984 34.6039 32.2012 37.568 32.2012H59.0355Z" />
        </clipPath>
        <filter
          id="filter7_ii_4022_71387"
          x="-26.8344"
          y="-26.8343"
          width="85.8699"
          height="85.8699"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4022_71387"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-5.36687" />
          <feGaussianBlur stdDeviation="2.68344" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_4022_71387"
            result="effect2_innerShadow_4022_71387"
          />
        </filter>
        <clipPath
          id="bgblur_7_4022_71387_clip_path"
          transform="translate(26.8344 26.8343)"
        >
          <rect
            width="32.2012"
            height="32.2012"
            rx="5.36687"
            transform="matrix(0 -1 -1 0 32.2012 32.2012)"
          />
        </clipPath>
        <clipPath id="paint11_diamond_4022_71387_clip_path">
          <rect
            width="32.2012"
            height="32.2012"
            rx="5.36687"
            transform="matrix(0 -1 -1 0 32.2012 32.2012)"
          />
        </clipPath>
        <linearGradient
          id="paint0_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4022_71387"
          x1="253.207"
          y1="18.4404"
          x2="209.308"
          y2="19.4834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#97C3FF" stop-opacity="0" />
          <stop offset="1" stop-color="#97C3FF" />
        </linearGradient>
        <linearGradient
          id="paint2_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4022_71387"
          x1="221.006"
          y1="18.4404"
          x2="177.107"
          y2="19.4834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#97C3FF" stop-opacity="0" />
          <stop offset="1" stop-color="#97C3FF" />
        </linearGradient>
        <linearGradient
          id="paint4_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_4022_71387"
          x1="188.805"
          y1="18.4404"
          x2="144.906"
          y2="19.4834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#97C3FF" stop-opacity="0" />
          <stop offset="1" stop-color="#97C3FF" />
        </linearGradient>
        <linearGradient
          id="paint6_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_4022_71387"
          x1="149.52"
          y1="21.9169"
          x2="112.705"
          y2="19.4834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#97C3FF" stop-opacity="0" />
          <stop offset="1" stop-color="#97C3FF" />
        </linearGradient>
        <linearGradient
          id="paint8_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_4022_71387"
          x1="71.6432"
          y1="14.091"
          x2="94.0257"
          y2="12.558"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#97C3FF" stop-opacity="0" />
          <stop offset="1" stop-color="#97C3FF" />
        </linearGradient>
        <linearGradient
          id="paint10_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint11_diamond_4022_71387"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip2_4022_71387">
          <path
            d="M155.639 32.2012C158.604 32.2012 161.006 29.7984 161.006 26.8344V5.36687C161.006 2.40283 158.604 0 155.639 0H134.172C131.208 0 128.805 2.40283 128.805 5.36687V26.8344C128.805 29.7984 131.208 32.2012 134.172 32.2012H155.639Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BackgroundAnimation;

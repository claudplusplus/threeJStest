import glsl from 'vite-plugin-glsl'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                index: './src/index.html',
                page1: './src/act11.html',
                page2: './src/act10.html',
                page3: './src/act9.html',
                page4: './src/act8.html',
                page5: './src/act7.html',
                page6: './src/act6.html',
                page7: './src/act4to5.html',
                page8: './src/act1to3.html',
                page9: './src/act12.html',
                page10: './src/act2-1.html',
                page11: './src/act3.html',
                page12: './src/act4.html'
            }
        }
    },
    plugins:
    [
        glsl()
    ]
}
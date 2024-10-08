# FSM 

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## High Level Overview 

- This project is hosting 2 main packages -> `fsm` and `pipeline`
  - The FSM library is hosted in [/libs/fsm](/libs/fsm)
  - The consuming app is hosted in [/apps/pipeline](/apps/pipeline)
- The use case to demonstrate FSM is CI pipeline flows
  - Deterministic - naive flow where each 'job' can transition to the next job (and depends on it), in case of a failure it moves to a review 'job'.
  - Non-Deterministic - more realistic flow where the state transition can be multiple options. Test sharding is a good example - tests can run in separated containers and outcome to the next success `job`.
 
### Testing Strategy

- **Smoke tests** written in playwright testing critical path of the application and covering only the happy path
- **Component tests** supporting near critical path flows written in react testing library
- **Unit tests** for testing the internal logic (vitest as a test runner)

** You might notice a testing terminology to describe the tests:
- GIVEN: What is the environment setup needed for this test?
- WHEN: What’s the action/set of actions to achieve that goal?
- THEN: How do we know we achieved that goal?

### Notes

- This project was initiated from my [monorepo-react](https://github.com/yarindeoh/react-monorepo) repo
  - Building a monorepo for 2 packages might be an overkill but I enjoyed continuing my NX POC experience!     
- Mocking fetch request was done with [WireMockCloud](https://www.wiremock.io/?utm_term=wiremock&utm_campaign=&utm_source=google-ads&utm_medium=ppc&hsa_acc=5738395631&hsa_cam=20513106615&hsa_grp=161638519886&hsa_ad=700918154393&hsa_src=g&hsa_tgt=kwd-333612867966&hsa_kw=wiremock&hsa_mt=p&hsa_net=adwords&hsa_ver=3&utm_adgroup=WireMock&gad_source=1&gclid=CjwKCAjw59q2BhBOEiwAKc0ijZFtAE-7YYXF7TNej3TufBBL_06rUnRp48JQGNUo2zuEmKMPoqVMkhoC_UMQAvD_BwE) 
  - I also provided a fallback by mocking the fetch request in case the WireMockCloud is down. 
- nx-cloud is disabled due to exceeding the free subscription :)
- Some Infra
  - When pushing code to `main` there is a CI verification that runs `test` `lint` and `e2e` for both packages.
  - In case it was verified it creates a git tag for `pipeline` app and release the package according to conventional commits(without actual publishing to npm)
  - The [application](https://yarindeoh.github.io/FSM/) **is deployed to Github Pages** (also available in the repo description).

### Working locally
- Install dependencies (node 20+)
```
npx npm install
```
- Start the `pipeline` application development server
```
npx nx serve pipeline
```

- Build the `pipeline` application in production mode. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed
```
npx nx run-many -t build
```

- Test `pipeline` application and `fsm` library - unit & component tests
```
npx nx test --project pipeline fsm
```

- Lint `pipeline` application and `fsm` library 
```
npx nx run-many -t lint
```

- Smoke tests for `pipeline` application
```
npx playwright install
npx nx e2e pipeline-e2e --ui
```


### What would I implement if I had infinite time? 
- Implement a small node server that will serve the initial config and also make the application stateful by storing the current state on unmount 
- Add caching to the application
- Improve styles
  - Loading skeleton
  - Error Component
  - Add Github font
- Implement more robust component tests by intercepting http requests (I didn't wanted to implement it with mocking all layers)
- If there will be a use case where the FSM needs to be used from outside I would publish it also as a standalone library and version control using git tags.
- For future use cases it might be nice to extend the FSM events and or make it dynamic (instead of success/failure).
- Automatic deploy to Github Pages (required some additional configuration)
